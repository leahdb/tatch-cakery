import React, { useEffect, useState, useMemo } from "react";
import { useCart } from "./UseCart";
import { remove_from_cart, update_cart } from "../../services/shop/cart";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Cart = () => {
  const { cart, totalItems, totalPrice, loading, setCart, setTotalItems, setTotalPrice } = useCart();

  const { subtotal, itemsCount } = useMemo(() => {
    const sub = cart.reduce((sum, it) => sum + Number(it.price) * Number(it.quantity), 0);
    const count = cart.reduce((sum, it) => sum + Number(it.quantity), 0);
    return { subtotal: sub, itemsCount: count };
  }, [cart]);

  useEffect(() => {
    setTotalItems(itemsCount);
    setTotalPrice(subtotal);
  }, [itemsCount, subtotal, setTotalItems, setTotalPrice]);

  const fmt = (n) => `$${n.toFixed(2)}`;

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

  const updateQty = (product_id, delta) => {
    const current = cart.find(it => it.product_id === product_id);
    if (!current) return;
    const nextQty = Math.max(1, current.quantity + delta);

    setCart(curr =>
      curr.map(it =>
        it.product_id === product_id
          ? { ...it, quantity: nextQty }
          : it
      )
    );

    update_cart(product_id, nextQty)
        .then(res => {
          const items = Object.entries(res.cart || {}).map(([key, v]) => ({
            id: key,
            product_id: v.product_id,
            name: v.name,
            quantity: v.quantity,
            price: v.price,
            slug: v.slug,
            image: v.image || "/placeholder.jpg",
            subtotal: v.price * v.quantity,
          }));
          setCart(items);
          setTotalItems(res.total_items);
          setTotalPrice(res.total_price);
        })
        .catch(err => {
          console.error("Update failed", err);
        });
  };


  const handleRemove = (e, id) => {
    e.preventDefault();
    remove_from_cart(id).then((res) => {
      console.log("Cart after removal:", res.cart);
      const items = Object.entries(res.cart).map(([key, v]) => ({
        id: key,
        product_id: v.product_id,
        name: v.name,
        quantity: v.quantity,
        price: v.price,
        slug: v.slug,
        image: v.image || "/placeholder.jpg",
        subtotal: v.price * v.quantity,
      }));
      setCart(items);
      setTotalItems(res.total_items);
      setTotalPrice(res.total_price);
    });
  };

  if (totalItems === 0) {
    return (
      <div className="d-flex align-items-center" style={{height: "100vh"}}>
        <div className="text-center">
          <h4 className="text-primary">Bag is empty</h4>
          <a className="btn btn-primary rounded-0" href="/">
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

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
                      className="btn color-primary fs-6 border-0"
                      type="button"
                      onClick={() => updateQty(item.product_id, -1)}
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
                      className="btn color-primary fs-6 border-0"
                      type="button"
                      onClick={() => updateQty(item.product_id, +1)}
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
                      onClick={(e) => handleRemove(e, item.product_id)}
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
            <div className="card rounded-0 bg-light-beige shadow-0 border-light-beige border">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Subtotal</p>
                  <p className="mb-2">{fmt(subtotal)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Discount</p>
                  <p className="mb-2 text-primary">{fmt(0)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Shipping</p>
                  <p className="mb-2 text-primary small d-flex align-items-end">Calculated on checkout</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total</p>
                  <p className="mb-2 fw-bold">{fmt(subtotal)}</p>
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
