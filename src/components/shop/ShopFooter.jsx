import React from "react";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";

const ShopFooter = () => {
  return (
    <>
      <footer className="footer bg-white py-5">
        <div className="container">
          {/* Footer Content */}
          <div className="row text-center align-items-center">
            {/* Logo and Description */}
            <div className="col-md-5 mb-4 mb-md-0">
              <img
                src={logoBlack}
                alt="Tatch Cakery Logo"
                className="footer-logo mb-3"
                aria-label="Tatch Cakery Logo"
              />
              <p className="text-muted">
                Delicious cakes made with love, bringing sweetness to every
                moment.
              </p>
            </div>

            <div className="col-md-6">
              <div className="row">
                {/* Quick Links */}
                <section className="col-sm-6 mb-4 mb-sm-0">
                  <h5 className="text-primary mb-3">Quick Links</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <a
                        href="/about"
                        className="text-dark text-decoration-none"
                        aria-label="About Us"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/menu"
                        className="text-dark text-decoration-none"
                        aria-label="Menu"
                      >
                        Menu
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/contact"
                        className="text-dark text-decoration-none"
                        aria-label="Contact"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </section>

                {/* Follow Us */}
                <section className="col-sm-6">
                  <h5 className="text-primary mb-4">Follow Us</h5>
                  <ul className="list-inline">
                    
                    {/* Instagram */}
                    <li className="list-inline-item">
                      <a
                        href="http://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none"
                        aria-label="Follow us on Instagram"
                        style={{ position: "relative" }}
                      >
                        <i
                          className="bi bi-instagram fs-4"
                          style={{
                            display: "block",
                            margin: "0 auto",
                            backgroundImage:
                              "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.filter = "brightness(1.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.filter = "brightness(1)";
                          }}
                        ></i>
                      </a>
                    </li>

                    {/* Facebook */}
                    <li className="list-inline-item ms-4">
                      <a
                        href="http://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none"
                        aria-label="Follow us on Facebook"
                      >
                        <i
                          className="bi bi-facebook fs-4"
                          style={{
                            display: "block",
                            margin: "0 auto",
                            transition: "all 0.3s ease",
                            color: "#4267B2",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.filter = "brightness(1.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.filter = "brightness(1)";
                          }}
                        ></i>
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <section className="bg-light text-center py-2">
        <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
          © 2025 Tatch Cakery. All Rights Reserved.
        </p>
      </section>
    </>
  );
};

export default ShopFooter;
