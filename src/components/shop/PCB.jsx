import React from "react";
import ShopIntro from "./ShopIntro";
import NewestProducts from "./NewestProducts";
import ChooseUs from "./ChooseUs";
import BlogsPreview from "./BlogsPreview";

const PCB = () => {
  return (
    <div className="container my-5">
      <div className="row gx-3">
        <main className="col-lg-8">
          <div className="card card-banner p-5 bg-light rounded-3">
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary rounded-3 px-4 py-2">
                <i className="bi bi-file-earmark-arrow-up-fill me-2 fs-4"></i>
                Add Gerber File
              </button>
            </div>
            <div className="small d-flex justify-content-center text-muted mt-4">
              <p className="me-5">Only accept zip or rar (Max 20MB)</p>
              <p>
                <i className="bi bi-database-lock me-1"></i>
                All uploads are secure and confidential.
              </p>
            </div>
          </div>
          <div className="card card-banner shadow rounded-3 mt-3">
            <div className="card-body p-4 text-center">
              <div className="row">
                <div className="col-4">
                  <ul>
                    <li className="d-flex justify-content-between mt-2">
                      Base Material
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      Layers
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      Dimensions
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      PCB Qty
                    </li>
                  </ul>
                </div>
                <div className="col-8">
                  <ul>
                    <li className="d-flex justify-content-between mt-2">
                      Base Material
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      Layers
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      Dimensions
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      PCB Qty
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mt-5">
                <h5 className="text-start fw-bold text-muted my-3">
                  PCB Specifications
                </h5>
                <div className="col-4">
                  <ul>
                    <li className="d-flex justify-content-between mt-2">
                      PCB Thickness
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      PCB Color
                    </li>
                  </ul>
                </div>
                <div className="col-8">
                  <ul>
                    <li className="d-flex justify-content-between mt-2">
                      Base Material
                    </li>
                    <li className="d-flex justify-content-between mt-2">
                      Layers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside className="col-lg-4">
          <div className="card card-banner shadow rounded-3">
            <div className="card-body p-4 text-center">
              <div className="pb-3 border-bottom border-light-subtle">
                <h5 className="text-start fw-bold text-muted mb-3">
                  Pricing Details
                </h5>
                <ul>
                  <li className="d-flex justify-content-between">
                    <span>Special Offer</span>
                    <span>$2.00</span>
                  </li>
                  <li className="d-flex justify-content-between mt-2">
                    <span>Via Covering</span>
                    <span>$0.00</span>
                  </li>
                  <li className="d-flex justify-content-between mt-2">
                    <span>Surface Finish</span>
                    <span>$0.00</span>
                  </li>
                  <li className="d-flex justify-content-between mt-2">
                    <span>Stencil</span>
                    <span>$7.00</span>
                  </li>
                </ul>
              </div>
              <div className="py-3 border-bottom border-light-subtle">
                <h5 className="text-start fw-bold text-muted mb-3">
                  Build Time
                </h5>
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="buildTime"
                        id="3-4days"
                        checked
                      />
                      <label className="form-check-label" htmlFor="3-4days">
                        3-4 days
                      </label>
                    </div>
                    <span>$2.00</span>
                  </li>
                  <li className="d-flex justify-content-between mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="buildTime"
                        id="2days"
                      />
                      <label className="form-check-label" htmlFor="2days">
                        2 days
                      </label>
                    </div>
                    <span>$0.00</span>
                  </li>
                  <li className="d-flex justify-content-between mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="buildTime"
                        id="24hours"
                      />
                      <label className="form-check-label" htmlFor="24hours">
                        24 hours
                      </label>
                    </div>
                    <span>$0.00</span>
                  </li>
                </ul>
              </div>
              <div className="py-4 d-flex justify-content-between">
                <h6 className="text-start fw-bold text-muted">
                  Calculated Price
                </h6>
                <h5 className="fw-bold text-primary">$9.00</h5>
              </div>
              <button className="btn btn-primary rounded-3 fs-5 px-3">
                Add To Cart
              </button>
            </div>
          </div>
          <div className="card card-banner shadow rounded-3 mt-3">
            <div className="card-body p-4 text-center">
              <div>
                <h5 className="text-start fw-bold text-muted mb-3">
                  Shipping Estimate
                </h5>
                <ul>
                  <li className="d-flex justify-content-between">
                    <span>Charge</span>
                    <span className="small">
                      choose destination country first
                    </span>
                  </li>
                  <li className="d-flex justify-content-between mt-2">
                    <span>Weight</span>
                    <span>1.13 KG</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PCB;
