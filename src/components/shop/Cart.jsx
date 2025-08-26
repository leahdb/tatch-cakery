import React, { useEffect, useState } from "react";
import { useCart } from "./UseCart";

const Cart = () => {
  const { cart, totalItems, totalPrice, loading, setCart } = useCart();
  if (loading) return <p>Loading...</p>;

  const updateQty = (id, delta) => {
    setCart(curr =>
      curr.map(it =>
        it.id === id
          ? { ...it, quantity: Math.max(1, it.quantity + delta) }
          : it
      )
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="m-4">
            <h4 className="card-title mb-4 color-primary">Your shopping bag</h4>
            {cart.map((item) => (
              <div
                className="row gy-3 mb-5 mb-md-4 d-flex align-items-center border-bottom pb-2 border-light-beige"
                key={item.id}
              >
                <div className="col-lg-5">
                  <div className="me-lg-5">
                    <div className="d-flex align-items-center">
                      <div className="me-3 d-flex justify-content-center align-items-center">
                        <img
                          src={item.image}
                          className="img-thumbnail-cart"
                          alt={item.name}
                        />
                      </div>

                      <div className="">
                        <a href="#" className="nav-link">
                          {item.name}
                        </a>
                        <p className="text-muted">${item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap align-items-center">
                  <div className="input-group border border-brown w-100 w-md-50 small-h-cart me-md-5 me-4">
                    <button
                      className="btn color-primary fs-6"
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      className="form-control text-center p-0 border-0 bg-light-beige color-primary fs-6 fw-bold"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="btn color-primary fs-6"
                      type="button"
                      onClick={() => updateQty(item.id, +1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="">
                    <text className="h6 color-primary">${item.price*item.quantity}</text>
                  </div>
                </div>
                <div className="col-lg-3 col-6 d-flex justify-content-end mb-2">
                  <div className="float-md-end">
                    <a
                      href="#"
                      className="remove-cart text-light-brown"
                    >
                      Remove
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="m-4">
            <div className="card mb-3 border shadow-0 rounded-0 bg-light-beige border-light-beige">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label className="form-label">Have promo code?</label>
                    <div className="input-group border">
                      <input
                        type="text"
                        className="form-control border-0 bg-light-beige-input"
                        name=""
                        placeholder="Promo code"
                      />
                      <button className="btn btn-light border-0 bg-light-beige-input remove-cart text-light-brown">Apply</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card rounded-0 bg-light-beige shadow-0 border-light-beige border">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Subtotal</p>
                  <p className="mb-2">$329.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Discount</p>
                  <p className="mb-2 text-primary">-$60.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Shipping</p>
                  <p className="mb-2 text-primary">Calculated on checkout</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total</p>
                  <p className="mb-2 fw-bold">$283.00</p>
                </div>

                <div className="mt-3">
                  <a href="/checkout" className="btn btn-primary w-100 shadow-0 mb-2 rounded-0">
                    Proceed To Checkout
                  </a>
                  <a href="/" className="btn btn-light w-100 border mt-2 rounded-0 bg-light-beige-input">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
