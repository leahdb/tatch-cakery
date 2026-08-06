import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useSearchParams, useNavigate } from "react-router-dom";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { notify_promise } from "../../services/utils/toasts";
import { fetch_shop_product } from "../../services/shop/products";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { add_to_cart, get_cart_item, update_cart_item } from "../../services/shop/cart";
import { formatLBP } from "../../services/utils/currency";
import { sendEvent } from "../../analytics/ga";


export default function ProductDetails() {
  const { setCartCount } = useOutletContext();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("item");
  const editMode = !!itemId;
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [buttonText, setButtonText] = useState(editMode ? "Save Changes" : "Add to cart");
  const [isAdding, setIsAdding] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState({});
  const [note, setNote] = useState("");

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
    if (!product) return;
    sendEvent("view_item", {
      currency: "LBP",
      value: Number(product.price) || 0,
      items: [{
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category?.name || "Unknown",
        price: Number(product.price) || 0,
        quantity: 1,
      }],
    });
  }, [product]);

  useEffect(() => {
    fetch_shop_product(slug).then((res) => {
        if (res.status === "ok") {
          setProduct(res.data);
          setLoading(false);
        }
    });
  }, [slug]);

  // Seed default selections once the product's customization groups are known
  useEffect(() => {
    const groups = product.customization_groups || [];
    if (groups.length === 0) return;

    const defaults = {};
    groups.forEach((g) => {
      defaults[g.key] = g.multiple ? [] : (g.required && g.options[0] ? g.options[0].code : "");
    });
    setSelections(defaults);
  }, [product.customization_groups]);

  // Edit mode: pull the cart item's saved config over the defaults
  useEffect(() => {
    if (!editMode || !product.customization_groups) return;
    get_cart_item(itemId).then((res) => {
      if (res.config) {
        setSelections((prev) => ({ ...prev, ...res.config }));
      }
      if (res.quantity) setQty(res.quantity);
      if (res.note) setNote(res.note);
    });
  }, [editMode, itemId, product.customization_groups]);

  const setSingleOption = (groupKey, code) => {
    setSelections((prev) => ({ ...prev, [groupKey]: code }));
  };

  const toggleMultiOption = (groupKey, code) => {
    setSelections((prev) => {
      const current = prev[groupKey] || [];
      const next = current.includes(code)
        ? current.filter((c) => c !== code)
        : [...current, code];
      return { ...prev, [groupKey]: next };
    });
  };

  const handleAddToCart = () => {
    if (isAdding || !product.in_stock) return;

    setIsAdding(true);
    setButtonText(editMode ? "Saving..." : "Adding...");

    if (editMode) {
      update_cart_item(itemId, { custom: selections, quantity: qty, note })
        .then(() => {
          navigate("/cart");
        })
        .finally(() => {
          setIsAdding(false);
          setButtonText("Save Changes");
        });
      return;
    }

    const payload = {
      product_id: product.id,
      quantity: qty,
      note,
    };

    if (product.customization_groups && product.customization_groups.length > 0) {
      payload.custom = selections;
    }

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

  const customizationGroups = product.customization_groups || [];

  const addonTotal = customizationGroups.reduce((sum, group) => {
    const sel = selections[group.key];
    if (group.multiple) {
      return sum + (sel || []).reduce((s, code) => {
        const opt = group.options.find((o) => o.code === code);
        return s + (opt ? opt.price : 0);
      }, 0);
    }
    const opt = group.options.find((o) => o.code === sel);
    return sum + (opt ? opt.price : 0);
  }, 0);

  const totalPrice = (product.price || 0) + addonTotal;

  return (
    <div className="container my-md-5 my-3 product-details-page">
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
            <h3 className="mb-1 color-primary fw-bold pt-md-3 pt-3">{product.name}</h3>

            <p className="my-2 mx-0 text-grey fs-125">{product.description}</p>

            <span className="fs-6 mt-md-2 fw-bold text-light-brown pb-3">{formatLBP(totalPrice)}</span>

            {customizationGroups.length > 0 && (
              <div className="mb-2 pb-3 px-2">
                {customizationGroups.map((group) => (
                  <div className="mb-3 border-top pt-3" key={group.key}>
                    <label className="form-label fs-6">{group.label}</label>
                    {group.options.map((opt) => {
                      const checked = group.multiple
                        ? (selections[group.key] || []).includes(opt.code)
                        : selections[group.key] === opt.code;
                      return (
                        <div className="form-check mb-2" key={opt.code}>
                          <input
                            className="form-check-input"
                            type={group.multiple ? "checkbox" : "radio"}
                            name={group.key}
                            checked={checked}
                            onChange={() =>
                              group.multiple
                                ? toggleMultiOption(group.key, opt.code)
                                : setSingleOption(group.key, opt.code)
                            }
                          />
                          <label className="form-check-label size-14">
                            {opt.label}
                            {opt.price > 0 && (
                              <small className="text-grey fs-12">&nbsp; +{formatLBP(opt.price)}</small>
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            <div className="mb-2 py-3 px-2 border-top">
              <label htmlFor="product-note" className="form-label fs-6">
                Note for your order (optional)
              </label>
              <textarea
                id="product-note"
                className="form-control"
                rows={2}
                placeholder="e.g. low ice, extra hot..."
                value={note}
                maxLength={500}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-4 mx-0 gy-md-0 gy-3 product-actions-bar bg-light-beige">
            <div className="col-12 col-md-6 quantity-button">
              <div className="input-group border border-brown w-100 small-h quantity-button-input">
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
            <div className="col-12 col-md-6 add-to-card-button-div">
              <button
                type="button"
                disabled={addDisabled}
                className="btn btn-primary w-100 rounded-0 h-100 small-h position-relative"
                onClick={handleAddToCart} >
                  {isOut ? "Out of stock" : buttonText}
                  {!isOut && (
                    <span className="position-absolute end-0 top-50 translate-middle-y pe-2 fs-12">
                      {formatLBP(totalPrice * qty)}
                    </span>
                  )}
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
        </div>
      </div>
    </div>
  );
};
