import React, { useEffect, useState } from "react";
import {useParams, useOutletContext} from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { notify_promise } from "../../services/utils/toasts";
import { fetch_shop_product } from "../../services/shop/products";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { add_to_cart } from "../../services/shop/cart";


export default function ProductDetails() {
  const { setCartCount } = useOutletContext();
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const [buttonText, setButtonText] = useState("Add to cart")
  const [isAdding, setIsAdding] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increase = () => {
    setQty(qty + 1);
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
    if (isAdding) return;
    setIsAdding(true);
    setButtonText("Adding...")
    const promise = add_to_cart({
      product_id: product.id,
      quantity: qty,
    });

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

  return (
    <div className="container my-md-5 my-3">
      <div className="row g-md-5 d-flex justify-content-between">
        <div className="col-md-6 col-12 px-0 px-md-4">
          <a href={product.image_path} data-fancybox="gallery">
            <img
              src={product.image_url}
              className="d-block w-100 carousel-image"
              alt="Product"
              loading="lazy"
            />
          </a>
          {/* <div className="thumbnail-container mt-5">
            {product.images.map((image, index) => (
              <a
                key={index}
                href={image}
                data-fancybox="gallery"
                className="thumbnail"
              >
                <img src={image.image} alt={`Thumbnail ${index + 1}`} />
              </a>
            ))}
          </div> */}
        </div>
        <div className="col-md-6 col-12">
          <div className="row px-2">
            <h3 className="mb-1 text-light-brown fw-bold pt-md-3 pt-4">{product.name}</h3>

            <span className="fs-5 mt-1 mt-md-2 fw-bold color-primary">${product.price}</span>

            <p className="pt-3 mt-4 mx-0">{product.description}</p>
          </div>

          <div className="row pt-3 mt-4 mx-0 gy-md-0 gy-3">
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
                disabled={isAdding} 
                className="btn btn-primary w-100 rounded-0 h-100 small-h" 
                onClick={handleAddToCart} >
                  {buttonText}
              </button>
            </div>
          </div>

          <div className="row border-top pt-3 mt-5 mx-0">
            <h5 className="fw-semibold text-dark mb-4">Description</h5>
          </div>
        </div>
      </div>
    </div>
  );
};