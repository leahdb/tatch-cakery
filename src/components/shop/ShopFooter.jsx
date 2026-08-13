import React from "react";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";

const ShopFooter = () => {
  return (
    <footer id="footer" className="footer-science bg-beige">
      <div className="container text-center">
        <img src={logoBlack} alt="logoBlack" className="footer-logo mb-3 mt-4" loading="lazy" height={40}/>
        <p className="text-muted">
          Delicious cakes made with love, bringing sweetness to every moment.
        </p>
      </div>
      <div className="site-info d-flex justify-content-center m-0">
        <div className="col-md-6 d-flex justify-content-center">
          <div className="footer-social-wrap m-0">
            <h3 className="social-title text-primary">Follow Us</h3>

            <ul className="footer-social-link">
              <li>
                <a href="https://www.facebook.com/profile.php?id=61579342395911#">
                  <i className="bi bi-facebook text-primary"></i>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@tatchcafe">
                  <i className="bi bi-tiktok text-primary"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/tatchcafe">
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
