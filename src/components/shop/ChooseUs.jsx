import React from "react";

const ChooseUs = () => {
  return (
    <div className="bg-light">
      <div className="container">
        <div className="row gy-3 gx-5 my-5 py-5">
          <div className="col-12 d-flex justify-content-between pb-4">
            <h3 className="fw-bold text-primary">Why Choose Us</h3>
          </div>
          <div class="col-lg-4 col-md-6">
            <figure class="d-flex align-items-top mb-4">
              <i class="bi bi-shop fs-3 text-primary me-3"></i>
              <figcaption class="info">
                <h6 class="title fw-semibold text-muted">One-Stop Solution</h6>
                <p className="small">
                  Simplify your sourcing, we offer a wide range of electronic
                  components and provide PCB manufacturing and assembly
                  services.
                </p>
              </figcaption>
            </figure>
          </div>
          <div class="col-lg-4 col-md-6">
            <figure class="d-flex align-items-top mb-4">
              <i class="bi bi-motherboard fs-3 text-primary me-3"></i>
              <figcaption class="info">
                <h6 class="title fw-semibold text-muted">
                  Precision PCB Fabrication
                </h6>
                <p className="small">
                  Experience top PCB fabrication with cutting-edge technology,
                  ensuring precision and reliability in every circuit board we
                  produce.
                </p>
              </figcaption>
            </figure>
          </div>
          <div class="col-lg-4 col-md-6">
            <figure class="d-flex align-items-top mb-4">
              <i class="bi bi-file-earmark-lock fs-3 text-primary me-3"></i>
              <figcaption class="info">
                <h6 class="title fw-semibold text-muted">
                  Secure and Confidential Handling
                </h6>
                <p className="small">
                  Your projects and sensitive information are confidential and
                  secure with us throughout the manufacturing process.
                </p>
              </figcaption>
            </figure>
          </div>
          <div class="col-lg-4 col-md-6">
            <figure class="d-flex align-items-top mb-4">
              <i class="bi bi-wallet2 fs-3 text-primary me-3"></i>
              <figcaption class="info">
                <h6 class="title fw-semibold text-muted">
                  Competitive Pricing
                </h6>
                <p className="small">
                  Get the best value for your investment with competitive
                  pricing on electronic components, PCB manufacturing, and
                  assembly services.
                </p>
              </figcaption>
            </figure>
          </div>
          <div class="col-lg-4 col-md-6">
            <figure class="d-flex align-items-top mb-4">
              <i class="bi bi-headset fs-3 text-primary me-3"></i>
              <figcaption class="info">
                <h6 class="title fw-semibold text-muted">
                  Responsive Customer Support
                </h6>
                <p className="small">
                  Have questions or need assistance? Our responsive customer
                  support team is ready to provide timely and helpful solutions.
                </p>
              </figcaption>
            </figure>
          </div>
          <div class="col-lg-4 col-md-6">
            <figure class="d-flex align-items-top mb-4">
              <i class="bi bi-truck fs-3 text-primary me-3"></i>
              <figcaption class="info">
                <h6 class="title fw-semibold text-muted">
                  Fast and Reliable Delivery
                </h6>
                <p className="small">
                  We ensure your orders reach you promptly, without compromising
                  on the safety and integrity of your products.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
