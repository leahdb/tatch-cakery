import React, { useState, useEffect } from "react";
import iconSearch from "../../resources/themes/dashboard-v1/icons/search.svg";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";
import User from "../../resources/themes/dashboard-v1/icons/user.svg";
import Cart from "../../resources/themes/dashboard-v1/icons/cart.svg";
import Heart from "../../resources/themes/dashboard-v1/icons/heart.svg";


const ShopHeader = () => {

  return (
    <header>
      <div class="p-3 text-center bg-white border-bottom">
        <div class="container">
          <div class="row gy-3 d-flex justify-content-between align-items-center">
            <div class="col-lg-2 col-sm-4 col-4">
              <img src={logoBlack} alt="logoBlack" />
            </div>
            <div className="col-lg-1"></div>

            <div class="order-lg-last col-lg-4 col-sm-8 col-8">
              <div class="d-flex float-end">
                <a
                  href="/login"
                  class="border rounded me-2 py-1 px-2 nav-link d-flex align-items-center"
                >
                  <img src={User} alt="profile" height={20} className="pe-1" />
                  <p class="d-none d-md-block mb-0">Login</p>
                </a>
                <a
                  href="/test"
                  class="me-2 border rounded py-1 px-2 nav-link d-flex align-items-center"
                  target="_blank"
                >
                  <img src={Heart} alt="profile" height={20} className="pe-1" />
                  <p class="d-none d-md-block mb-0">Wishlist</p>
                </a>
                <a
                  href="/test"
                  class="border rounded py-1 px-2 nav-link d-flex align-items-center"
                  target="_blank"
                >
                  <img src={Cart} alt="profile" height={20} className="pe-1" />
                  <p class="d-none d-md-block mb-0">Cart</p>
                </a>
              </div>
            </div>
            <div class="col-lg-5 col-md-12 col-12">
              <div class="input-group">
                <input
                  type="search"
                  id="form1"
                  class="form-control"
                  placeholder="Search..."
                />
                <button
                  type="button"
                  class="btn btn-primary shadow-0d-flex align-items-center"
                >
                  <img src={iconSearch} alt="search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container justify-content-center justify-content-md-between">
          <button
            class="navbar-toggler border text-dark py-2"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarLeftAlignExample"
            aria-controls="navbarLeftAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarLeftAlignExample">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100">
              <li class="nav-item">
                <a class="nav-link text-dark" href="#">
                  Categories
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" href="#">
                  PCB Builder
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" href="#">
                  Hardware
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" href="#">
                  Mechanical
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" href="#">
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
