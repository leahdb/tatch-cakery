import React from "react";
import iconSearch from "../../resources/themes/dashboard-v1/icons/search.svg";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";
import User from "../../resources/themes/dashboard-v1/icons/user.svg";
import Cart from "../../resources/themes/dashboard-v1/icons/cart.svg";
import Heart from "../../resources/themes/dashboard-v1/icons/heart.svg";

const ShopHeader = () => {
  return (
    <header>
      <div className="p-3 text-center bg-white border-bottom">
        <div className="container">
          <div className="row gy-3 d-flex justify-content-between align-items-center">
            <div className="col-lg-2 col-sm-4 col-5">
              <img src={logoBlack} alt="logoBlack" />
            </div>
            <div className="col-lg-1 desktop-only"></div>

            <div className="order-lg-last col-lg-4 col-sm-8 col-6">
              <div className="d-flex float-end">
                <a
                  href="/login"
                  className="border rounded me-2 py-1 px-2 nav-link d-flex align-items-center"
                >
                  <img src={User} alt="profile" height={18} className="pe-1" />
                  <p className="d-none d-md-block mb-0">Login</p>
                </a>
                <a
                  href="/test"
                  className="me-2 border rounded py-1 px-2 nav-link d-flex align-items-center"
                  target="_blank"
                >
                  <img src={Heart} alt="profile" height={18} className="pe-1" />
                  <p className="d-none d-md-block mb-0">Wishlist</p>
                </a>
                <a
                  href="/test"
                  className="border rounded py-1 px-2 nav-link d-flex align-items-center"
                  target="_blank"
                >
                  <img src={Cart} alt="profile" height={18} className="pe-1" />
                  <p className="d-none d-md-block mb-0">Cart</p>
                </a>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <div className="input-group">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Search..."
                />
                <button
                  type="button"
                  className="btn btn-primary shadow-0d-flex align-items-center"
                >
                  <img src={iconSearch} alt="search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container justify-content-center justify-content-md-between">
          <button
            className="navbar-toggler border text-dark py-2"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarLeftAlignExample"
            aria-controls="navbarLeftAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Categories
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/pcb-builder">
                  PCB Builder
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Hardware
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Mechanical
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Boards
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ShopHeader;
