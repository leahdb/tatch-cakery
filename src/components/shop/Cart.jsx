import React from "react";

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

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-9">
          <div className="card border shadow-0">
            <div className="m-4">
              <h4 className="card-title mb-4 color-primary">Your shopping bag</h4>
              {products.map((product) => (
                <div
                  className="row gy-3 mb-4 d-flex align-items-center"
                  key={product.id}
                >
                  <div className="col-lg-5">
                    <div className="me-lg-5">
                      <div className="d-flex">
                        <div className="img-thumbnail me-3 d-flex justify-content-center align-items-center">
                          <img
                            src={product.imageSrc}
                            className="img-thumbnail-cart"
                            alt={product.name}
                          />
                        </div>

                        <div className="">
                          <a href="#" className="nav-link">
                            {product.name}
                          </a>
                          <p className="text-muted">{product.info}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap align-items-center">
                    <div className="me-2">
                      <select className="form-select me-4">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                    <div className="">
                      <text className="h6">$1156.00</text>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6 d-flex justify-content-end mb-2">
                    <div className="float-md-end">
                      <a
                        href="#"
                        className="btn btn-light border px-3 pt-2 icon-hover"
                      >
                        <i className="bi bi-trash-fill fs-5 py-1 text-danger"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-4 mx-4 mb-4">
              <p>
                <i className="fas fa-truck text-muted fa-lg"></i>
                Delivery withing Beirut
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card mb-3 border shadow-0">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label className="form-label">Have coupon?</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border"
                      name=""
                      placeholder="Coupon code"
                    />
                    <button className="btn btn-light border">Apply</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card shadow-0 border">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total price:</p>
                <p className="mb-2">$329.00</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Discount:</p>
                <p className="mb-2 text-success">-$60.00</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total price:</p>
                <p className="mb-2 fw-bold">$283.00</p>
              </div>

              <div className="mt-3">
                <a href="#" className="btn btn-success w-100 shadow-0 mb-2">
                  Proceed To Checkout
                </a>
                <a href="#" className="btn btn-light w-100 border mt-2">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
