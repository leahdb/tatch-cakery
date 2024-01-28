import React from "react";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";

const ShopFooter = () => {
  return (
    <footer id="footer" className="footer-science">
      <div className="container">
        <div className="footer-widget-wrapper pt-5 pb-0">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div
                id="ultraland_widget_about-3"
                className="widget ultraland_widget about-widget_wrapper  wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <img src={logoBlack} alt="logoBlack" className="footer-logo" />
                <ul className="footer-contact-info">
                  <li className="phone">
                    <i className="feather-phone"></i>+(426) 762 44 356
                  </li>
                  <li className="email">
                    <i className="feather-mail"></i>{" "}
                    contact@electrotech-trading.com
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-6">
              <div
                className="widget widget-footer-menu wow fadeInUp mb-0"
                data-wow-delay="0.5s"
              >
                <h4 className="widget-title text-primary">Departments</h4>
                <ul className="footer-menu">
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="service.html">Services</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="widget widget-footer-menu wow fadeInUp mb-0"
                data-wow-delay="0.7s"
              >
                <h4 className="widget-title text-primary">Links</h4>
                <ul className="footer-menu">
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                  <li>
                    <a href="service.html">Service</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="widget ultraland-contact-widget wow fadeInUp mb-0"
                data-wow-delay="0.7s"
              >
                <h3 className="widget-title text-primary">Newsletter</h3>
                <p>
                  Subscribe to our newsletter to receive early discount offers.
                </p>

                <form
                  action="php/subscribe.php"
                  method="post"
                  className="footer-newsletter-form"
                  data-tt-form="newsletter-subscribe"
                >
                  <div className="newsletter-inner d-flex justify-content-center style_one">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your email..."
                      required=""
                    />

                    <button
                      type="submit"
                      name="submit"
                      className="btn-primary px-3 border-0"
                    >
                      <i className="bi bi-arrow-right"></i>
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  </div>

                  <div className="form-result alert">
                    <div className="content"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="site-info">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copy-right">
                © 2024 ElectroTech Trading Rights Reserved
              </p>
            </div>

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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
