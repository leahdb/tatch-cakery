import React from "react";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";

const ShopFooter = () => {
  return (
    <footer id="footer" className="footer-science bg-beige">
      <div className="container text-center">
        <img src={logoBlack} alt="logoBlack" className="footer-logo" />
        <p>
          Delicious cakes made with love, bringing sweetness to every moment.
        </p>
      </div>
      <div className="site-info">
        <div className="col-md-6">
          <div className="footer-social-wrap">
            <h3 className="social-title">Follow Us</h3>

            <ul className="footer-social-link">
              <li>
                <a href="http://facebook.com">
                  <i className="bi bi-facebook text-primary"></i>
                </a>
              </li>
              <li>
                <a href="http://twitter.com">
                  <i className="bi bi-whatsapp text-primary"></i>
                </a>
              </li>
              <li>
                <a href="http://dribbble.com">
                  <i className="bi bi-instagram text-primary"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="row align-items-center">
          <div className="col-md-6">
            <p className="copy-right">
              © 2025 Tatch Cakery. All Rights Reserved.
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default ShopFooter;
