import React, { useState, useEffect } from "react";
import iconClose from "../../../../resources/themes/dashboard-v1/icons/close.svg";

import inStock from "../../../../resources/themes/dashboard-v1/icons/inStock.svg";
import outStock from "../../../../resources/themes/dashboard-v1/icons/outStock.svg";

import {
  update_product_quantity,
} from "../../../../services/shops/orders";

import { notify_promise } from "../../../../services/utils/toasts";
const OrderPopup = ({ order, setOrders, setSelectedOrder }) => {
  const [productQuantities, setProductQuantities] = useState({});

  useEffect(() => {
    if (order) {
      const initialQuantities = order.products.reduce((acc, product) => {
        acc[product.id] = product.pivot.quantity;
        return acc;
      }, {});
      setProductQuantities(initialQuantities);
    }
  }, [order]);

  if (order === undefined) {
    return (
      <div
        id="orderPopup"
        className="popup-container vw-100 vh-100  jusitfy-content-center align-items-center p-md-0 p-2"
      ></div>
    );
  }

  const closePopup = () => {
    const popup = document.getElementById("orderPopup");
    popup.style.display = "none";
  };

  window.onkeydown = function (event) {
    if (event.keyCode === 27) {
      closePopup();
    }
  };

  const removeProduct = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: 0,
    }));
  };

  const updateQuantity = (productId, delta) => {
    setProductQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[productId] + delta;
      return {
        ...prevQuantities,
        [productId]: newQuantity < 0 ? 0 : newQuantity,
      };
    });
  };
  

  const saveQuantities = () => {
    notify_promise(
      update_product_quantity(order.id, productQuantities).then(() => {
        setSelectedOrder((prevOrder) => {
          const updatedProducts = prevOrder.products
            .map((product) => ({
              ...product,
              pivot: {
                ...product.pivot,
                quantity: productQuantities[product.id],
              },
            }))
            .filter((product) => product.pivot.quantity > 0);
          return { ...prevOrder, products: updatedProducts };
        });
        setOrders((orders) =>
          orders.map((o) =>
            o.id === order.id
              ? {
                  ...o,
                  products: o.products
                    .map((product) => ({
                      ...product,
                      pivot: {
                        ...product.pivot,
                        quantity: productQuantities[product.id],
                      },
                    }))
                    .filter((product) => product.pivot.quantity > 0),
                }
              : o
          )
        );
      })
    );
  };

  return (
    <div
      id="orderPopup"
      className="popup-container vw-100 vh-100  jusitfy-content-center align-items-center p-md-0 p-2"
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
          <div className="pb-0">
            <h5 className="modal-title" id="chatModalLabel">
              Order &nbsp;
              <span className="fs-6 text-muted">#{order.id}</span>
            </h5>
            <div className="product-modal-header-info">
              <div className={"popup-data-items-container text-left mt-2"}>
                {order.products.length > 0 ? (
                  order.products.map((product, index) => {
                    const isRemoved = productQuantities[product.id] === 0;
                    return (
                      <div
                        className={`d-flex gap-4 border rounded-3 border-secondary border-2 border-opacity-10 p-3 mb-3 position-relative ${
                          isRemoved ? "removed-product" : ""
                        }`}
                        key={index}
                      >
                        {isRemoved && (
                          <div className="removed-overlay position-absolute w-100 h-100 top-0 left-0 bg-dark opacity-50 rounded-3"></div>
                        )}
                        <div className="">
                          <img
                            className={"img-product rounded-3"}
                            src={product.img_picture}
                            alt="product image"
                          />
                        </div>
                        <div className="w-100">
                          <div className="row">
                            <h5 className="col-auto fw-bold mb-1">
                              {product.name}
                            </h5>
                            <img
                              src={
                                product.stock_quantity > 0 ? inStock : outStock
                              }
                              alt="close"
                              height={26}
                              className="col-auto"
                            />
                          </div>
                          <p className="text-muted fw-bold brand-name my-1">
                            {product.brand_name}
                          </p>
                          <div className="row d-flex justify-content-between align-items-end">
                            <div className="col-auto">
                              <p className="product-details mb-0">
                                Order Quantity: {product.pivot.quantity}
                              </p>
                              <p className="product-details mb-3">
                                Stock Quantity: {product.stock_quantity}
                              </p>
                              <span className="fs-6 border rounded-4 border-secondary border-2 border-opacity-50 text-muted py-1 px-3">
                                {product.category.title}
                              </span>
                              <p className="text-muted fw-bold fs-6 mt-3 mb-0">
                                Total:{" "}
                                <span className="text-primary fs-5">
                                  {(
                                    product.pivot.quantity * product.price
                                  ).toFixed(2)}{" "}
                                  {order.currency}
                                </span>
                              </p>
                            </div>
                            <div className="col-auto">
                              <div className="d-flex justify-content-center mb-2">
                                <div>
                                  <button
                                    className="btn btn-outline-secondary text-primary fw-bold qty-btn"
                                    onClick={() =>
                                      updateQuantity(product.id, -1)
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="px-2 fw-bold">
                                    {productQuantities[product.id]}
                                  </span>
                                  <button
                                    className="btn btn-outline-secondary text-primary fw-bold qty-btn"
                                    onClick={() =>
                                      updateQuantity(product.id, 1)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <button
                                className="btn btn-outline-primary"
                                onClick={() =>
                                  removeProduct(product.id)
                                }
                              >
                                Remove from Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-danger text-center fw-bold my-4 fs-5">
                    Order canceled because no products remaining
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-auto max-height-500 py-4 d-flex flex-column gap-2">
            {Object.entries(order.breakdown).map(([key, value]) => (
              <div
                className={`d-flex justify-content-between px-2 ${
                  key === "Total" ? "border-top pt-2" : ""
                }`}
              >
                <span
                  className={`fw-bold ${key === "Total" ? "" : "text-muted"}`}
                >
                  {key}
                </span>
                <span
                  className={`fw-bold ${key === "Total" ? "" : "text-muted"}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary" onClick={saveQuantities}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
