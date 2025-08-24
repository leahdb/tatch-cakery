import React, { useEffect, useState } from "react";
import { fetch_cart } from "../../services/shop/cart";

const Cart = () => {
  const products = [
    {
      id: 1,
      name: "Raspberry Pi 4 Model B",
      price: 35.99,
      imageSrc:
        "https://www.seeedstudio.com/blog/wp-content/uploads/2019/06/WechatIMG1371.png",
      info: "2 GB",
    },
    {
      id: 2,
      name: "Arduino Uno R3",
      price: 24.99,
      imageSrc:
        "https://rukminim1.flixcart.com/image/1664/1664/j76i3rk0/learning-toy/j/z/8/arduino-uno-r3-board-with-dip-atmega328p-adraxx-original-imaexh74faqkvygt.jpeg?q=90",
      info: "Input voltage - 7-12V",
    },
    {
      id: 3,
      name: "ESP8266 WiFi Module",
      price: 3.49,
      imageSrc:
        "https://tse1.mm.bing.net/th?id=OIP.5LofEV_I-Y9PG-53g9Iu5AHaHa&pid=Api&P=0&h=220",
      info: "ESP-12E",
    },
  ];
  const [cart, setCart] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch_cart().then((res) => {
      const items = Object.entries(res.cart).map(([key, v]) => ({
        id: key,                  // "2:20" (unique per product+variant/price)
        product_id: v.product_id,
        name: v.name,
        quantity: v.quantity,
        price: v.price,
        slug: v.slug,
        image: v.image || null, // normalize image field name
        subtotal: v.price * v.quantity,
      }));
      setCart(items);
      setTotalItems(res.total_items);
      setTotalPrice(res.total_price)
    });
  }, []);

  if (!cart) return <p>Loading...</p>;

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
                      onClick={item.quantity>1 && item.quantity--}
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
                      onClick={item.quantity++}
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
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price</p>
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
