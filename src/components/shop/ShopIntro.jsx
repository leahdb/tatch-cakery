import React from "react";

const ShopIntro = () => {
  return (
          <div
            className="card-banner p-5 bg-primary carousel slide"
            id="carouselIntro"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators mb-2">
              <button
                type="button"
                data-bs-target="#carouselIntro"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselIntro"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselIntro"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner h-100">
              <div className="carousel-item active flex-column justify-content-between">
                <h2 className="text-light">
                  All your electronics needs <br />
                  in one place
                </h2>
              </div>
              <div className="carousel-item">
                <h2 className="text-light">
                  All your electronics needs <br />
                  in one place
                </h2>
                <p className="text-light">
                  No matter how far along you are in your sophistication as an
                  amateur astronomer, there is always one.
                </p>
                <a href="#" className="btn btn-light shadow-0 text-primary">
                  {" "}
                  View more{" "}
                </a>
              </div>
              <div className="carousel-item">
                <h2 className="text-light">
                  All your electronics needs <br />
                  in one place
                </h2>
                <p className="text-light">
                  No matter how far along you are in your sophistication as an
                  amateur astronomer, there is always one.
                </p>
                <a href="#" className="btn btn-light shadow-0 text-primary">
                  {" "}
                  View more{" "}
                </a>
              </div>
            </div>
          </div>
  );
};

export default ShopIntro;
