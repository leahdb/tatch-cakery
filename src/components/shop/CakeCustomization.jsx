import React, { useState, useEffect } from "react";
import SVGVisualizer from "./SVGVisualizerV2";
import MotifPicker from "./MotifPicker";
import ColorPicker from "./ColorPicker";
import CreamColorPicker from "./CreamColorPicker";
import { cakeCode, middleCreamCode, topCreamCode, fillingCode, extraOptions, customizationOptions } from "../../services/shop/customizationOptions";
import { add_to_cart } from "../../services/shop/cart";
import { fetch_shop_product } from "../../services/shop/products";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CakeCustomization = () => {
    const TOP_CREAM_COLORS = [
      { id: "white",   label: "White",   hex: "#FFFFFF", border: true },
      { id: "black",   label: "Black",   hex: "#111827" },
      { id: "red",     label: "Red",     hex: "#EF4444" },
      { id: "blue",    label: "Blue",    hex: "#3B82F6" },
      { id: "green",   label: "Green",   hex: "#10B981" },
      { id: "pink",    label: "Pink",    hex: "#EC4899" },
      { id: "purple",  label: "Purple",  hex: "#8B5CF6" },
      { id: "yellow",  label: "Yellow",  hex: "#FACC15" },
      { id: "orange",  label: "Orange",  hex: "#FB923C" },
      { id: "fuchsia", label: "Fuchsia", hex: "#D946EF" },
    ];
    const [product, setProduct] = useState([]);
    const [selectedCake, setSelectedCake] = useState(cakeCode[0]);
    const [selectedCream, setSelectedCream] = useState(middleCreamCode[0]);
    const [selectedTopCream, setSelectedTopCream] = useState(topCreamCode[0]);
    const [topCreamColor, setTopCreamColor] = useState(TOP_CREAM_COLORS[0]); 
    const [selectedFilling, setSelectedFilling] = useState(fillingCode[0]);
    const [selectedExtras, setSelectedExtras] = useState(extraOptions[0]);
    const [selectedCustomization, setSelectedCustomization] = useState(customizationOptions[0]);
    const [loading, setLoading] = useState(true);

    
    const [additionalNote, setAdditionalNote] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [motifChoice, setMotifChoice] = useState(null);
    const [plexiColor, setPlexiColor] = useState({ id: "gold",   label: "Gold",   type: "gradient", gradient: "linear-gradient(135deg,#B28900,#F1CF63 35%,#7A5A00 65%,#F7E7A1)" });
    const [qty, setQty] = useState(1);
    
    const decrease = () => {
      if (qty > 1) setQty(qty - 1);
    };
  
    const increase = () => {
      setQty(qty + 1);
    };

    console.log(topCreamColor);

    useEffect(() => {
      console.log("[CakeCustomization] mounted");
      fetch_shop_product("build-your-cake").then((res) => {
          if (res.status === "ok") {
            setProduct(res.data);
            setLoading(false)
          }
      });
    }, []);

    const handleAddToCart = () => {
        const payload = {
          product_id: product.id,
          quantity: qty,
          custom: {
            fillings: selectedFilling.code,// array
            extras: selectedExtras.code, // array (use checkbox array if you want many)
            designs: selectedCustomization.code, // array
            // Optional extra metadata for your order item (not used for pricing):
            note: additionalNote || null,
            message: selectedCustomization.code === "choco_letters" || selectedCustomization.code === "plexi_writing"
              ? (customInput || "")
              : null,
            plexi_color: selectedCustomization.label.includes("plexi") ? plexiColor : null,
            motif: selectedCustomization.code === "plexi_motif" ? motifChoice : null,
            // You can also send the three “cream” layers if you price them:
            mcreams: selectedCream.code,
            tcreams: selectedTopCream.code,
            cake_flavor: selectedCake.code, // if you want to store/display
          },
        };
        add_to_cart(payload).then((res) => {
          if (res.total_items != undefined) {
            console.log("Cart:", res.cart.cart);
            alert("Product added to cart successfully"); // "Product added to cart successfully"
          }
        });
      };

    const totalPrice =
      product.price +
      (selectedCream?.price || 0) +
      (selectedFilling?.price || 0) +
      (selectedExtras?.price || 0) +
      (selectedCustomization?.price || 0);
    
    

    // const handleAddToCart = () => {
    //   console.log(formData);
    //   if (id !== undefined) {
    //     edit_shop_products(id, formData).then((res) => {
    //       setShouldRedirectToIndex(res.status === "ok");
    //     });
    //   } else {
    //     add_shop_products(formData).then((res) => {
    //       setShouldRedirectToIndex(res.status === "ok");
    //     });
    //   }
    // };


    // export const edit_shop_orders = (id, data) => {
    //   return fetch(`${API_HOST}edit/${id}`, {
    //     method: "POST",
    //     credentials: "include",
    //     secure: true,
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((res) => res.json());
    // };

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
              <label className="form-label fs-5">Filling Flavor</label>
              {middleCreamCode.map((filling, index) => (
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
              <label className="form-label fs-5">Add On</label>
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
                      &nbsp;{custom.price > 0 ? `+${custom.price}$` : ""}
                    </small>
                  </label>
                </div>
              ))}
              {selectedCustomization.label.includes("Writing") && (
                <div className="my-3">
                  <label className="form-label fs-5">Enter Your Message</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your custom message"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
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
                      className="form-control text-center p-0 border-0 bg-light-beige color-primary fs-5 fw-bold"
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
                  <button className="btn btn-primary w-100 rounded-0 h-100" onClick={handleAddToCart}>Add to cart</button>
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