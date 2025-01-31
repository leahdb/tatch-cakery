import React, { useEffect } from "react";
import iconClose from "../../../resources/themes/dashboard-v1/icons/close.svg";

import starSVG from "../../../resources/themes/dashboard-v1/icons/star.svg";
const ProductPopup = ({ product }) => {
  let reviews = [
    // {user_name: "My Floyd Miles", user_image: '', review_text: 'pretty colors too ! '},
    // {user_name: "My Floyd Miles", user_image: '', review_text: 'pretty colors too ! '},
  ];

  if (product === undefined) {
    return (
      <div
        id="productPopup"
        className="popup-container vw-100 vh-100  jusitfy-content-center align-items-center p-md-0 p-2"
      ></div>
    );
  }

  const closePopup = () => {
    const popup = document.getElementById("productPopup");
    popup.style.display = "none";
  };

  window.onkeydown = function (event) {
    if (event.keyCode === 27) {
      closePopup();
    }
  };

  return (
    <div
      id="productPopup"
      className="popup-container vw-100 vh-100 jusitfy-content-center align-items-center p-md-0 p-2"
    >
      <div
        onClick={closePopup}
        className="w-100 h-100 position-absolute outer-modal top-0 left-0"
      ></div>
      <div className="popup position-relative bg-white">
        <img
          onClick={closePopup}
          className="close-btn"
          src={iconClose}
          alt="close"
        />

        <div className="py-3 px-4">
          <h6 className="modal-title" id="chatModalLabel">
            Product &nbsp;
            <span className="small text-muted">#{product.id}</span>
          </h6>
          <div className="border-bottom pb-4">
            <div className="d-md-flex">
              <div className="d-flex justify-content-center">
                <img
                  className={"img-thumbnail"}
                  src={product.image}
                  alt="Product Image"
                  height={150}
                  width={100}
                />
              </div>
              <div className="product-modal-header-info">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex space-between">
                    <span className="text-muted fw-semibold small">
                      {product.brand_name}
                    </span>
                  </div>
                  <span className="fs-5 fw-bold mb-4">{product.name}</span>
                </div>

                <div className={"text-left mt-4"}>
                  <span className={"fw-bold color-primary fs-5"}>
                    $ {product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
