import React, { useEffect } from "react";
import iconClose from "../../resources/themes/dashboard-v1/icons/close.svg";

import starSVG from "../../resources/themes/dashboard-v1/icons/star.svg";
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
                  src={product.img_picture}
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
                    <div
                      className={
                        "d-flex align-items-center justify-content-center"
                      }
                    >
                      <img src={starSVG} height={16} width={16} alt={"Star"} />
                      <img src={starSVG} height={16} width={16} alt={"Star"} />
                      <img src={starSVG} height={16} width={16} alt={"Star"} />
                      <img src={starSVG} height={16} width={16} alt={"Star"} />
                      <img src={starSVG} height={16} width={16} alt={"Star"} />
                      <div className={"pleft-10 text-muted small"}>
                        {product.average_rating} ({product.total_reviews}{" "}
                        Reviews)
                      </div>
                    </div>
                  </div>
                  <span className="fs-5 fw-bold mb-4">{product.name}</span>
                </div>

                <div className={"d-flex gap-2"}>
                  <span className="table-category product-popup-category fw-bold text-white">
                    {product.category.title}
                  </span>
                </div>

                <div className={"text-left mt-4"}>
                  <span className={"fw-bold color-primary fs-5"}>
                    $ {product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="popup-data-items-container overflow-auto max-height-500 py-4 d-flex flex-column gap-4">
            <span className="fw-bold fs-5">Reviews</span>
            {product.reviews.map((review, index) => {
              return (
                <div
                  className={"product-review d-flex gap-4 border-bottom py-4"}
                  key={index}
                >
                  <div className="">
                    <img
                      width={80}
                      height={120}
                      className={"reviewer-img img-thumbnail"}
                      src={review.pet_owner.picture}
                      alt="user image"
                    />
                    {/*<img src={review.user_image} alt="User Image"/>*/}
                  </div>
                  <div>
                    <span>
                      {review.pet_owner.first_name +
                        " " +
                        review.pet_owner.last_name}
                    </span>
                    <div className={"d-flex flex-row"}>
                      <img src={starSVG} width={20} alt={"Star"} />
                      <div className={"m-2"}>{review.rating}</div>
                    </div>
                    <p className={"bold"}>{review.description}</p>
                  </div>
                </div>
              );
            })}

            {product.reviews.length === 0 ? (
              <p className={"text-center"}>This product has no reviews</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
