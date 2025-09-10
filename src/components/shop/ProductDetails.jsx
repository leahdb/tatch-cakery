import React, { useEffect, useState } from "react";
import {useParams, useOutletContext} from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { notify_promise } from "../../services/utils/toasts";
import { fetch_shop_product } from "../../services/shop/products";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { add_to_cart } from "../../services/shop/cart";
import { customizationOptions } from "../../services/shop/customizationOptions";
import MotifPicker from "./MotifPicker";
import ColorPicker from "./ColorPicker";


export default function ProductDetails() {
  const { setCartCount } = useOutletContext();
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [buttonText, setButtonText] = useState("Add to cart")
  const [isAdding, setIsAdding] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCustomization, setSelectedCustomization] = useState(customizationOptions[0]);
  const [additionalNote, setAdditionalNote] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [motifChoice, setMotifChoice] = useState(null);
  const [plexiColor, setPlexiColor] = useState({ id: "gold",   label: "Gold",   type: "gradient", gradient: "linear-gradient(135deg,#B28900,#F1CF63 35%,#7A5A00 65%,#F7E7A1)" });

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increase = () => {
    if (typeof product.stock_quantity === "number") {
      setQty((q) => Math.min(q + 1, product.stock_quantity));
    } else {
      setQty((q) => q + 1);
    }
  };

  useEffect(() => {
    fetch_shop_product(slug).then((res) => {
        if (res.status === "ok") {
          setProduct(res.data);
          setLoading(false);
        }
    });
  }, []);

  const handleAddToCart = () => {
    if (isAdding || !product.in_stock) return;

    setIsAdding(true);
    setButtonText("Adding...");

    // Base payload
    const payload = {
      product_id: product.id,
      quantity: qty,
    };

    // Build custom object
    const custom = {
      designs: selectedCustomization.code,
      note: additionalNote || null,
      message:
        (selectedCustomization.code === "choco_letters" ||
          selectedCustomization.code === "plexi_writing")
          ? (customInput || "")
          : null,
      plexi_color: selectedCustomization.label.includes("plexi")
        ? plexiColor
        : null,
      motif: selectedCustomization.code === "plexi_motif"
        ? motifChoice
        : null,
    };

    // Remove null/empty values
    let cleanCustom = Object.fromEntries(
      Object.entries(custom).filter(([_, v]) => v !== null && v !== "")
    );

    // If designs === "none", ignore it completely
    if (cleanCustom.designs === "none") {
      delete cleanCustom.designs;
    }

    // Only attach custom if something remains
    if (Object.keys(cleanCustom).length > 0) {
      payload.custom = cleanCustom;
    }

    const promise = add_to_cart(payload);

    notify_promise(promise, "Added to cart!", "🛒");

    promise
      .then((res) => {
        setCartCount(res.cart.total_items);
      })
      .finally(() => {
        setIsAdding(false);
        setButtonText("Add to cart");
      });
  };


  if (loading) return (
    <div className="d-flex align-items-center" style={{height: "100vh"}}>
      <DotLottieReact
        src="https://lottie.host/610317e0-ecdf-497f-9224-6fed273a4574/UVCpOZhutB.lottie"
        loop
        autoplay
        style={{height: "auto"}}
      />
    </div>
  );

  const isOut = !product.in_stock;
  const addDisabled = isOut || isAdding;

  const totalPrice =
      product.price +
      (selectedCustomization?.price || 0);

  return (
    <div className="container my-md-5 my-3">
      <div className="row g-md-5 d-flex justify-content-between">
        <div className="col-md-6 col-12 px-0 px-md-4">
          <img
            src={product.image_url}
            className="d-block w-100 carousel-image"
            alt="Product"
            loading="lazy"
          />
        </div>
        <div className="col-md-6 col-12">
          <div className="row px-2">
            <h3 className="mb-1 text-light-brown fw-bold pt-md-3 pt-4">{product.name}</h3>

            <span className="fs-5 mt-1 mt-md-2 fw-bold color-primary">${totalPrice}</span>

            <p className="pt-3 mt-4 mx-0">{product.description}</p>

            {product.category.id == 2 && (
              <div className="mb-2 py-3 px-2 border-top">
                <label className="form-label fs-6">
                  Customization{" "}
                  <span className="tooltip-wrapper">
                    <i className="bi bi-info-circle-fill text-primary" />
                    <span className="tooltip-text">
                      Cakes with customization can't be delivered on same day.
                    </span>
                  </span>
                </label>
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
                    <label className="form-check-label size-14">
                      {custom.label}
                      <small className="text-muted">
                        &nbsp;{custom.price > 0 ? `+${custom.price}$` : ""}
                      </small>
                    </label>
                  </div>
                ))}
                {selectedCustomization.label.includes("Writing") && (
                  <div className="my-3">
                    <label className="form-label fs-6">Enter Your Message</label>
                    <input
                      type="text"
                      className="form-control size-14"
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
            )}
          </div>

          <div className="row mt-4 mx-0 gy-md-0 gy-3">
            <div className="col-12 col-md-6">
              <div className="input-group border border-brown w-100 small-h">
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
              <button 
                type="button" 
                disabled={addDisabled}
                className="btn btn-primary w-100 rounded-0 h-100 small-h" 
                onClick={handleAddToCart} >
                  {isOut ? "Out of stock" : buttonText}
              </button>
            </div>
            <div className="col-12">
              {product.low_stock && product.in_stock && (
                <div className="mt-2">
                  <span className="badge text-primary">Low stock</span>
                </div>
              )}
            </div>
          </div>


          <div className="row border-top pt-3 mt-5 mx-0">
            <h5 className="fw-semibold text-dark mb-4">Description</h5>
            <p>{product.description_long}</p>
          </div>
        </div>
      </div>
    </div>
  );
};