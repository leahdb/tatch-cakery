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
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-9">
          <div class="card border shadow-0">
            <div class="m-4">
              <h4 class="card-title mb-4">Your shopping cart</h4>
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
                  <div class="col-lg-4 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap align-items-center">
                    <div class="me-2">
                      <select class="form-select me-4">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                    <div class="">
                      <text class="h6">$1156.00</text> <br />
                      <small class="text-muted text-nowrap">
                        {" "}
                        $460.00 / per item{" "}
                      </small>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                    <div class="float-md-end">
                      <a
                        href="#!"
                        className="btn btn-light border px-3 pt-2 icon-hover me-2"
                      >
                        <i class="bi bi-heart-fill fs-5 py-1 text-primary"></i>
                      </a>
                      <a
                        href="#"
                        class="btn btn-light border px-3 pt-2 icon-hover"
                      >
                        <i class="bi bi-trash-fill fs-5 py-1 text-danger"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div class="border-top pt-4 mx-4 mb-4">
              <p>
                <i class="fas fa-truck text-muted fa-lg"></i> Delivery
                within 2 weeks
              </p>
              <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card mb-3 border shadow-0">
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label class="form-label">Have coupon?</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control border"
                      name=""
                      placeholder="Coupon code"
                    />
                    <button class="btn btn-light border">Apply</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="card shadow-0 border">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <p class="mb-2">Total price:</p>
                <p class="mb-2">$329.00</p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">Discount:</p>
                <p class="mb-2 text-success">-$60.00</p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">TAX:</p>
                <p class="mb-2">$14.00</p>
              </div>
              <hr />
              <div class="d-flex justify-content-between">
                <p class="mb-2">Total price:</p>
                <p class="mb-2 fw-bold">$283.00</p>
              </div>

              <div class="mt-3">
                <a href="#" class="btn btn-success w-100 shadow-0 mb-2">
                  Proceed To Checkout
                </a>
                <a href="#" class="btn btn-light w-100 border mt-2">
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
