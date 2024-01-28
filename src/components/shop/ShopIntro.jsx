import React from "react";

const ShopIntro = () => {
  return (
    <div className="container">
      <div className="row gx-3">
        <main className="col-lg-9">
          <div
            className="card-banner p-5 bg-primary rounded-3 carousel slide"
            id="carouselIntro"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators mb-2">
              <button
                type="button"
                data-bs-target="#carouselIntro"
                data-bs-slide-to="0"
                class="active"
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
            <div class="carousel-inner h-100">
              <div class="carousel-item active flex-column justify-content-between">
                <h2 className="text-light">
                  All your electronics needs <br />
                  in one place
                </h2>
              </div>
              <div class="carousel-item">
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
              <div class="carousel-item">
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
        </main>
        <aside className="col-lg-3">
          <div className="card-banner pcb-bg h-100 rounded-3">
            <div className="card-body text-center pb-5">
              <h3 className="pt-5 text-light fw-bold">PCB Builder</h3>
              <p className="text-light px-4 pt-2">
                No matter how far along you are in your sophistication
              </p>
              <a href="/pcb-builder" className="btn btn-outline-light">
                Instant Quote
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShopIntro;
