// ThankYou.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const ThankYou = () => {
  const { state } = useLocation() || {};
  const {
    orderId,
    orderNumber,
    deliveryType,
    deliveryDate,
    timeLabel,
    name,
  } = state || {};

  return (
    <div className="container my-5">
      <div className="card border-0 shadow-0 bg-light-beige p-5">
        <h2 className="mb-3 color-primary">Thank you{ name ? `, ${name}` : "" }! 🎉</h2>
        <p className="mb-2">Your order has been placed successfully.</p>

        {orderNumber && <p className="mb-2">Order #: <b>{orderNumber}</b></p>}
        {orderId && !orderNumber && <p className="mb-2">Order ID: <b>{orderId}</b></p>}

        <p className="mb-2">
          Delivery: <b>{deliveryType === "now" ? "ASAP" : `${deliveryDate} • ${timeLabel}`}</b>
        </p>

        <div className="mt-4 d-flex gap-3">
          <Link to="/" className="btn btn-primary rounded-0">Continue Shopping</Link>
          <Link to="/orders" className="btn btn-light rounded-0 border">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
