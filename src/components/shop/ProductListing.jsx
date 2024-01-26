import React from "react";

const ProductListing = () => {
  const products = [
    {
      id: 1,
      name: "Raspberry Pi 4 Model B",
      price: 35.99,
      imageSrc:
        "https://www.seeedstudio.com/blog/wp-content/uploads/2019/06/WechatIMG1371.png",
    },
    {
      id: 2,
      name: "Arduino Uno R3",
      price: 24.99,
      imageSrc:
        "https://rukminim1.flixcart.com/image/1664/1664/j76i3rk0/learning-toy/j/z/8/arduino-uno-r3-board-with-dip-atmega328p-adraxx-original-imaexh74faqkvygt.jpeg?q=90",
    },
    {
      id: 3,
      name: "ESP8266 WiFi Module",
      price: 3.49,
      imageSrc:
        "https://tse1.mm.bing.net/th?id=OIP.5LofEV_I-Y9PG-53g9Iu5AHaHa&pid=Api&P=0&h=220",
    },
    {
      id: 4,
      name: "MPU6050 Gyroscope and Accelerometer Module",
      price: 15.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.9F2kvsmNfU-ekR6VZwVu4QHaFx&pid=Api&P=0&h=220",
    },
    {
      id: 5,
      name: "DHT22 Temperature and Humidity Sensor",
      price: 9.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.QZI5OE82YcwbFmafi3MSmAHaHa&pid=Api&P=0&h=220",
    },
    {
      id: 6,
      name: "BME280 Environmental Sensor",
      price: 8.99,
      imageSrc:
        "https://images-na.ssl-images-amazon.com/images/I/41j5cHWfpDL.jpg",
    },
    {
      id: 7,
      name: "Breadboard Jumper Wires Kit",
      price: 6.99,
      imageSrc:
        "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F7916454-01",
    },
    {
      id: 8,
      name: "STMicroelectronics Nucleo-F401RE Development Board",
      price: 19.99,
      imageSrc: "https://media.rs-online.com/f_auto/F8029425-01.jpg",
    },
    {
      id: 9,
      name: "LM317 Adjustable Voltage Regulator",
      price: 1.99,
      imageSrc:
        "https://i5.walmartimages.com/asr/becb1f3d-da68-4fe4-ae95-1a031d7e068a_1.590bdaf485016abeff4daf43c9ff3a85.jpeg",
    },
    {
      id: 10,
      name: "Soldering Iron Kit",
      price: 29.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.w9Q9-ejAmxUgg0v6tezclgHaHa&pid=Api&P=0&h=220",
    },
  ];

  return (
    <div className="container my-5">
      <div class="row">
        <div class="col-lg-3">
          <button
            class="btn btn-outline-secondary mb-3 w-100 d-lg-none"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>Show filter</span>
          </button>
          <div
            class="collapse card d-lg-block mb-5"
            id="navbarSupportedContent"
          >
            <div class="accordion" id="accordionPanelsStayOpenExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button text-dark bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Related items
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                >
                  <div class="accordion-body">
                    <ul class="list-unstyled">
                      <li>
                        <a href="#" class="text-dark">
                          Electronics{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-dark">
                          Home items{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-dark">
                          Books, Magazines{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-dark">
                          Men's clothing{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-dark">
                          Interiors items{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-dark">
                          Underwears{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-dark">
                          Shoes for men{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-dark">
                          Accessories{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button text-dark bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    Brands
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingTwo"
                >
                  <div class="accordion-body">
                    <div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked1"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked1">
                          Mercedes
                        </label>
                        <span class="badge badge-secondary float-end">120</span>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked2"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked2">
                          Toyota
                        </label>
                        <span class="badge badge-secondary float-end">15</span>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked3"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked3">
                          Mitsubishi
                        </label>
                        <span class="badge badge-secondary float-end">35</span>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked4"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked4">
                          Nissan
                        </label>
                        <span class="badge badge-secondary float-end">89</span>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Honda
                        </label>
                        <span class="badge badge-secondary float-end">30</span>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Suzuki
                        </label>
                        <span class="badge badge-secondary float-end">30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button text-dark bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    Price
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingThree"
                >
                  <div class="accordion-body">
                    <div class="range">
                      <input
                        type="range"
                        class="form-range"
                        id="customRange1"
                      />
                    </div>
                    <div class="row mb-3">
                      <div class="col-6">
                        <p class="mb-0">Min</p>
                        <div class="form-outline">
                          <input
                            type="number"
                            id="typeNumber"
                            class="form-control"
                          />
                          <label class="form-label" for="typeNumber">
                            $0
                          </label>
                        </div>
                      </div>
                      <div class="col-6">
                        <p class="mb-0">Max</p>
                        <div class="form-outline">
                          <input
                            type="number"
                            id="typeNumber"
                            class="form-control"
                          />
                          <label class="form-label" for="typeNumber">
                            $1,0000
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-white w-100 border border-secondary"
                    >
                      apply
                    </button>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button text-dark bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseFour"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFour"
                  >
                    Size
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseFour"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingThree"
                >
                  <div class="accordion-body">
                    <input
                      type="checkbox"
                      class="btn-check border justify-content-center"
                      id="btn-check1"
                      checked
                      autocomplete="off"
                    />
                    <label class="btn btn-white mb-1 px-1" for="btn-check1">
                      XS
                    </label>
                    <input
                      type="checkbox"
                      class="btn-check border justify-content-center"
                      id="btn-check2"
                      checked
                      autocomplete="off"
                    />
                    <label class="btn btn-white mb-1 px-1" for="btn-check2">
                      SM
                    </label>
                    <input
                      type="checkbox"
                      class="btn-check border justify-content-center"
                      id="btn-check3"
                      checked
                      autocomplete="off"
                    />
                    <label class="btn btn-white mb-1 px-1" for="btn-check3">
                      LG
                    </label>
                    <input
                      type="checkbox"
                      class="btn-check border justify-content-center"
                      id="btn-check4"
                      checked
                      autocomplete="off"
                    />
                    <label class="btn btn-white mb-1 px-1" for="btn-check4">
                      XXL
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
            <strong class="d-block py-2">32 Items found </strong>
            <div class="ms-auto">
              <select class="form-select d-inline-block w-auto border pt-1">
                <option value="0">Best match</option>
                <option value="1">Recommended</option>
                <option value="2">High rated</option>
                <option value="3">Randomly</option>
              </select>
            </div>
          </header>

          <div class="row g-3">
            {products.slice(0, 9).map((product) => (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 col-sm-6 d-flex"
              >
                <div className="card w-100 my-2 shadow">
                  <div className="d-flex justify-content-center">
                    <img
                      src={product.imageSrc}
                      className="card-img-top"
                      alt={product.name}
                      height={200}
                    />
                  </div>
                  
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fs-6">{product.name}</h5>
                      <p className="card-text fs-6 text-primary">
                        ${product.price}
                      </p>
                    </div>

                    <div className="d-flex align-items-end justify-content-center px-0 pb-0 mt-4">
                      <a
                        href="#!"
                        className="btn btn-primary px-3 shadow-0 me-2"
                      >
                        <i class="bi bi-cart-plus fs-5 py-1"></i>
                      </a>
                      <a
                        href="#!"
                        className="btn btn-light border px-3 pt-2 icon-hover"
                      >
                        <i class="bi bi-heart-fill fs-5 py-1 text-primary"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <nav
            aria-label="Page navigation example"
            class="d-flex justify-content-center mt-3"
          >
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  4
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  5
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
