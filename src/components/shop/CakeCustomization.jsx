import React, { useState, useEffect, useRef, useMemo } from "react";
import { useOutletContext, useNavigate, useSearchParams } from "react-router-dom";
import SVGVisualizer from "./SVGVisualizerV2";
import MotifPicker from "./MotifPicker";
import ColorPicker from "./ColorPicker";
import CreamColorPicker from "./CreamColorPicker";
import { cakeCode, middleCreamCode, topCreamCode, fillingCode, extraOptions, customizationOptions } from "../../services/shop/customizationOptions";
import { add_to_cart, get_cart_item, update_cart_item } from "../../services/shop/cart";
import { fetch_shop_product } from "../../services/shop/products";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { notify_promise } from "../../services/utils/toasts";

const CakeCustomization = () => {
    const TOP_CREAM_COLORS = [
      { id: "red",     label: "Red",     hex: "#EF4444" },
      { id: "blue",    label: "Blue",    hex: "#3B82F6" },
      { id: "green",   label: "Green",   hex: "#10B981" },
      { id: "pink",    label: "Pink",    hex: "#EC4899" },
      { id: "purple",  label: "Purple",  hex: "#8B5CF6" },
      { id: "yellow",  label: "Yellow",  hex: "#FACC15" },
      { id: "orange",  label: "Orange",  hex: "#FB923C" },
      { id: "black",   label: "Black",   hex: "#111827" },
    ];
    const [params] = useSearchParams();
    const itemId = params.get("item")
    const svgRef = useRef(null);
    const editMode = !!itemId;
    const { setCartCount } = useOutletContext();
    const [product, setProduct] = useState([]);
    const [selectedCake, setSelectedCake] = useState(cakeCode[0]);
    const [selectedCream, setSelectedCream] = useState(middleCreamCode[0]);
    const [selectedTopCream, setSelectedTopCream] = useState(topCreamCode[0]);
    const [topCreamColor, setTopCreamColor] = useState(TOP_CREAM_COLORS[0]); 
    const [selectedFilling, setSelectedFilling] = useState({});
    const [selectedExtras, setSelectedExtras] = useState({});
    const [selectedCustomization, setSelectedCustomization] = useState(customizationOptions[0]);
    const [buttonText, setButtonText] = useState("Add to cart")
    const [isAdding, setIsAdding] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [previewUrl, setPreviewUrl] = useState(null);

    
    const [additionalNote, setAdditionalNote] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [motifChoice, setMotifChoice] = useState(null);
    const [plexiColor, setPlexiColor] = useState({ id: "gold",   label: "Gold",   type: "gradient", gradient: "linear-gradient(135deg,#B28900,#F1CF63 35%,#7A5A00 65%,#F7E7A1)" });
    const [qty, setQty] = useState(1);

    const MAX_MSG_LEN = 24;
    const isChocoLetters = selectedCustomization.code === "choco_letters";
    const chocoMsgLen = customInput.length;

    const chocoLettersPrice = isChocoLetters
    ? (chocoMsgLen === 0 ? 0 : (chocoMsgLen <= 10 ? 1 : 2))
    : 0;

    const decrease = () => {
      if (qty > 1) setQty(qty - 1);
    };
  
    const increase = () => {
      setQty(qty + 1);
    };

    useEffect(() => {
      if (!editMode) return;

      (async () => {
        try {
          const res = await get_cart_item(itemId);
          const cfg = res?.config || {};

          // ---- apply to your existing state ----
          // Adjust these to your exact state variable names/options lists

          if (cfg.cake_flavor)       setSelectedCake({ code: cfg.cake_flavor, label: cfg.cake_flavor });
          if (cfg.fillings)    setSelectedFilling({ code: cfg.fillings, label: cfg.fillings });
          if (cfg.mcreams)      setSelectedCream({ code: cfg.mcreams, label: cfg.mcreams });
          if (cfg.tcreams)   setSelectedTopCream({ code: cfg.tcreams, label: cfg.tcreams });
          if (cfg.top_cream_color)   setTopCreamColor({ code: cfg.top_cream_color, label: cfg.tcreams });

          // Only show color if colored vanilla
          if (cfg.tcreams === "colored_vanilla" && cfg.topCreamColor) {
            setTopCreamColor(
              TOP_CREAM_COLORS.find(c => c.id === cfg.topCreamColor) || TOP_CREAM_COLORS[0]
            );
          }

          if (typeof cfg.message === "string") setCustomInput(cfg.message || "");

          // Motif / plexi / lettering mode
          if (cfg.motif) setMotifChoice(cfg.motif);
          if (cfg.plexi_color) setPlexiColor(cfg.plexi_color);

          if (cfg.designs === "chocolate") {
            setSelectedCustomization({ label: "Chocolate Letters Writing", code: "choco_letters", price: 1 });
          } else if (cfg.designs === "plexi") {
            setSelectedCustomization({ label: "Plexi Writing", code: "plexi_writing", price: 0 });
          } else if (cfg.motif) {
            setSelectedCustomization({ label: "Plexi Motif", code: "plexi_motif", price: 0 });
          } else {
            setSelectedCustomization({ label: "No Customization", code: "none", price: 0 });
          }

          // (Optional) preload preview while SVG draws
          if (res.preview_url) setPreviewUrl(res.preview_url);

          // (Optional) quantity if you allow editing it in builder
          if (res.quantity) setQty(res.quantity);

          // (Optional) product info (base price / name) if you need it in the UI
          // setProduct(res.product);

        } catch (e) {
          console.error("Failed to load item config", e);
        }
      })();
    }, [editMode, itemId]);

    useEffect(() => {
      console.log("[CakeCustomization] mounted");
      fetch_shop_product("build-your-cake").then((res) => {
          if (res.status === "ok") {
            setProduct(res.data);
            setLoading(false)
          }
      });
    }, []);

    const onSaveEdit = async () => {
      if (!editMode || !itemId) return;

      // 1) Serialize current SVG preview (optional but recommended)
      const svgEl = svgRef.current || document.querySelector('#cake_builder_svg');
      let preview_svg = null;
      if (svgEl) {
        const serializer = new XMLSerializer();
        preview_svg = serializer.serializeToString(svgEl);
        if (!preview_svg.includes('xmlns=')) {
          preview_svg = preview_svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }
      }

      // 2) Build the SAME custom shape you used for add_to_cart
      const custom = {
        fillings: selectedFilling.code,
        extras: selectedExtras.code,
        designs: selectedCustomization.code,
        note: additionalNote || null,
        message:
          (selectedCustomization.code === "choco_letters" || selectedCustomization.code === "plexi_writing")
            ? (customInput || "")
            : null,
        plexi_color: selectedCustomization.label.includes("plexi") ? plexiColor : null,
        motif: selectedCustomization.code === "plexi_motif" ? motifChoice : null,
        mcreams: selectedCream.code,
        tcreams: selectedTopCream.code,
        cake_flavor: selectedCake.code,
        // include the color only when colored vanilla is chosen
        top_cream_color:
          (selectedTopCream.code === "colored_vanilla")
            ? (topCreamColor?.id || null)  // send the color ID you store (e.g., 'pink')
            : null,
      };

      try {
        const res = await update_cart_item(itemId, {
          custom,
          quantity: qty,               // keep or remove if you don't edit qty here
          ...(preview_svg ? { preview_svg } : {}),
        });

        // Whether merged or not, head back to cart (cart page will refetch)
        window.location.href = "/cart";
      } catch (e) {
        console.error("Update failed", e);
        alert("Could not save changes. Please try again.");
      }
    };

    const handleAddToCart = async () => {
      if (isAdding) return;
      setIsAdding(true);
      setButtonText("Adding...")
      // 1) Serialize SVG
      const svgEl = svgRef.current || document.querySelector('#cake_builder_svg');
      if (!svgEl) { alert("Preview not ready"); return; }

      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgEl);
      if (!svgString.includes('xmlns=')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // 2) Build payload with your existing config + preview
      const payload = {
        product_id: product.id,
        quantity: qty,
        custom: {
          fillings: selectedFilling.code,
          extras: selectedExtras.code,
          designs: selectedCustomization.code,
          note: additionalNote || null,
          message:
            (selectedCustomization.code === "choco_letters" ||
            selectedCustomization.code === "plexi_writing")
              ? (customInput || "")
              : null,
          plexi_color: selectedCustomization.label.includes("plexi") ? plexiColor : null,
          motif: selectedCustomization.code === "plexi_motif" ? motifChoice : null,
          mcreams: selectedCream.code,
          tcreams: selectedTopCream.code,
          cake_flavor: selectedCake.code,
          top_cream_color:
          (selectedTopCream.code === "colored_vanilla")
            ? (topCreamColor?.id || null)  // send the color ID you store (e.g., 'pink')
            : null,
        },
        // ONE-CALL PREVIEW
        preview_svg: svgString,
        // or: preview_png_data_url: await svgToPngDataUrl(svgString)
      };

      const promise = add_to_cart(payload);
      
      notify_promise(promise, "Added to cart!", "🛒");
  
      promise
        .then((res) => {
          setCartCount(res.total_items);
        })
        .finally(() => {
          setIsAdding(false);
          setButtonText("Add to cart");
        });
    };

    const totalPrice =
      product.price +
      (selectedCream?.price || 0) +
      (selectedFilling?.price || 0) +
      (selectedExtras?.price || 0) +
      (selectedTopCream?. price || 0) +
      (isChocoLetters ? chocoLettersPrice : (selectedCustomization?.price || 0));
    
    

    async function svgToPngDataUrl(svgString, width = 1080) {
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise((res, rej) => {
        img.onload = res; img.onerror = rej; img.src = url;
      });

      const aspect = img.height / img.width;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = Math.round(width * aspect);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      return canvas.toDataURL('image/png');
    }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <DotLottieReact
          src="https://lottie.host/610317e0-ecdf-497f-9224-6fed273a4574/UVCpOZhutB.lottie"
          loop
          autoplay
          style={{height: "auto"}}
        />
      </div>
    );
  }

  return (
    <div className="row mt-3 bg-light-gray cake-customization">
      <div className="col-12 col-lg-6 d-flex justify-content-center px-5 custom-height-1">
        <SVGVisualizer
          cakeFlavor={selectedCake.code}                       // "Vanilla" | "Chocolate" | "RedVelvet"
          fillingFlavor={selectedFilling.code}           // "Nutella" | "Pistachio" | ...
          creamFlavor={selectedCream.code}               // "Vanilla" | "Chocolate" | ...
          topCreamFlavor={selectedTopCream.code}
          vanillaColor={topCreamColor?.id || null}  
          message={customInput}
          motif={selectedCustomization.code === "plexi_motif" ? motifChoice : null}
          plexiColor={plexiColor}
          letteringMode={
            selectedCustomization.code === "choco_letters"
              ? "chocolate"
              : selectedCustomization.code === "plexi_writing"
              ? "plexi"
              : "none"
          }
        />
      </div>
      <div className="col-12 col-lg-6 overflow-auto custom-height-2">
        <div className="bg-white mb-2">
          <div className="container pb-3 pt-1">
            <h2 className="pt-4">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <h4>{totalPrice.toFixed(2)}$</h4>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Cake Flavor</label>
              {cakeCode.map((flavor, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cakeFlavor"
                    value={flavor.label}
                    checked={selectedCake.code === flavor.code}
                    onChange={() => setSelectedCake(flavor)}
                  />
                  <label className="form-check-label">{flavor.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Cream Flavor</label>
              {middleCreamCode.map((flavor, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="creamFlavor"
                    value={flavor.label}
                    checked={selectedCream.code === flavor.code}
                    onChange={() => setSelectedCream(flavor)}
                  />
                  <label className="form-check-label">
                    {flavor.label}{" "}
                    <small className="text-muted">
                      &nbsp;{flavor.price > 0 ? `+${flavor.price}$` : ""}
                    </small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Top Cream Flavor</label>
              {topCreamCode.map((flavor, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="topCreamFlavor"
                    value={flavor.label}
                    checked={selectedTopCream.code === flavor.code}
                    onChange={() => {
                      setSelectedTopCream(flavor);
                      if (flavor.code === "colored_vanilla" && !topCreamColor) {
                        setTopCreamColor(TOP_CREAM_COLORS[0]);
                      }
                      if (flavor.code !== "colored_vanilla") {
                        setTopCreamColor(null);
                      }
                    }}
                  />
                  <label className="form-check-label">
                    {flavor.label}{" "}
                    <small className="text-muted">
                      &nbsp;{flavor.price > 0 ? `+${flavor.price}$` : ""}
                    </small>
                  </label>
                </div>
              ))}
              {(selectedTopCream.code === "colored_vanilla" ||
                selectedTopCream.label === "Colored Vanilla") && (
                <CreamColorPicker 
                  value={topCreamColor} 
                  onChange={setTopCreamColor}
                  options={TOP_CREAM_COLORS}
                />
              )}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Filling Flavor{" "}
                <span className="tooltip-wrapper">
                  <i className="bi bi-info-circle-fill text-primary" />
                  <span className="tooltip-text-short">
                    Filling is inside the cake.
                  </span>
                </span></label>
              {fillingCode.map((filling, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="fillingFlavor"
                    value={filling.label}
                    checked={selectedFilling.code === filling.code}
                    onChange={() => setSelectedFilling(filling)}
                  />
                  <label className="form-check-label">
                    {filling.label}{" "}
                    <small className="text-muted">&nbsp;+{filling.price}$</small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Add On{" "}
                <span className="tooltip-wrapper">
                  <i className="bi bi-info-circle-fill text-primary" />
                  <span className="tooltip-text-short">
                    Add on is inside the cake.
                  </span>
                </span></label>
              {extraOptions.map((extra, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={extra.label}
                    checked={selectedExtras.code === extra.code}
                    onChange={() => setSelectedExtras(extra)}
                  />
                  <label className="form-check-label">
                    {extra.label}{" "}
                    <small className="text-muted">&nbsp;+{extra.price}$</small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Customization</label>
              {customizationOptions.map((custom, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="customization"
                    value={custom.label}
                    checked={selectedCustomization.code === custom.code}
                    onChange={() => {
                      setSelectedCustomization(custom);
                      if (custom.label !== "Plexi Motif") {
                        setMotifChoice(null); // clear motif when leaving motif mode
                      }
                    }}
                  />
                  <label className="form-check-label">
                    {custom.label}
                    <small className="text-muted">
                      &nbsp;{
                        custom.code === "choco_letters"
                          ? (chocoMsgLen === 0 ? "+$1-2" : `+${chocoLettersPrice}$`)
                          : (custom.price > 0 ? `+${custom.price}$` : "")
                      }
                    </small>
                  </label>
                </div>
              ))}
              {selectedCustomization.label.includes("Writing") && (
                <div className="my-3">
                  <label className="form-label fs-5 w-100 d-flex justify-content-between align-items-end">Enter Your Message <small className="text-muted size-14">{chocoMsgLen}/{MAX_MSG_LEN}</small></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your custom message"
                    value={customInput}
                    onChange={(e) => {
                      const v = e.target.value || "";
                      // hard cap at 24 (including spaces)
                      setCustomInput(v.slice(0, MAX_MSG_LEN));
                    }}
                  />
                </div>
              )}
              {selectedCustomization.label.includes("Drawing") ||
              selectedCustomization.label.includes("Motif") ? (
                <MotifPicker
                  value={motifChoice}
                  onChange={setMotifChoice}
                />
              ) : null}
              {selectedCustomization.label.includes("Plexi") && (
                <div className="my-3">
                  <ColorPicker
                    value={plexiColor}
                    onChange={setPlexiColor}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Additional Notes</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter any additional requests"
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
              />
              <div className="row pt-3 mt-5 mx-0">
                <div className="col-12 col-md-6">
                  <div className="input-group border border-brown w-100">
                    <button
                      className="btn color-primary fs-5"
                      type="button"
                      onClick={decrease}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      className="form-control text-center p-0 border-0 color-primary fs-5 fw-bold"
                      value={qty}
                      readOnly
                    />
                    <button
                      className="btn color-primary fs-5"
                      type="button"
                      onClick={increase}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  {editMode ? (
                    <button className="btn btn-primary w-100 rounded-0 h-100" onClick={onSaveEdit}>
                      Save Changes
                    </button>
                  ) : (
                    <button className="btn btn-primary w-100 rounded-0 h-100" onClick={handleAddToCart}>{buttonText}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CakeCustomization;