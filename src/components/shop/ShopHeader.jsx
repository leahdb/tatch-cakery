import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import iconSearch from "../../resources/themes/dashboard-v1/icons/search-white.svg";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";
import User from "../../resources/themes/dashboard-v1/icons/user.svg";
import Cart from "../../resources/themes/dashboard-v1/icons/cart.svg";
import Heart from "../../resources/themes/dashboard-v1/icons/heart.svg";
import { Navigate } from "react-router-dom";
import { unauthenticate } from "../../services/auth";
import { fetch_shop_home } from "../../services/shop/home";

class ShopHeader extends React.Component {
  state = {
    isLoggedOut: false,
    dropdownVisible: false,
    categories: [],
  };

  // componentDidMount() {
  //   fetch_shop_home().then((response) => {
  //     if (response.status === "ok") {
  //       this.setState({ categories: response.categories });
  //     }
  //   });
  // }

  logout = () => {
    unauthenticate().then((response) => {
      this.setState({ isLoggedOut: response.status === "ok" });
    });
  };

  handleClickOutside = () => {
    this.setState({ dropdownVisible: false });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownVisible: !prevState.dropdownVisible,
    }));
  };

  render() {
    const { isLoggedOut, dropdownVisible, categories } = this.state;

    if (isLoggedOut) {
      return <Navigate to={"/login"} />;
    }

    let isLoggedIn = localStorage["user_logged_in"];

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // useEffect(() => {
    //   fetch_shop_home().then((response) => {
    //     if (response.status === "ok")
    //       this.setState({ categories: response.categories });
    //   });
    // }, []);

    return (
      <header>
        <div className="p-3 text-center bg-white border-bottom">
          <div className="container">
            <div className="row gy-3 d-flex justify-content-between align-items-center">
              <div className="col-lg-2 col-sm-4 col-5">
                <a href="/">
                  <img src={logoBlack} alt="logoBlack" />
                </a>
              </div>
              <div className="col-lg-1 desktop-only"></div>

              <div className="order-lg-last col-lg-4 col-sm-8 col-6">
                <div className="d-flex float-end">
                  <a
                    href="/wishlist"
                    className="me-2 border rounded py-1 px-2 nav-link d-flex align-items-center"
                  >
                    <img
                      src={Heart}
                      alt="profile"
                      height={18}
                      className="pe-1"
                    />
                    <p className="d-none d-md-block mb-0">Wishlist</p>
                  </a>
                  <a
                    href="/cart"
                    className="border rounded py-1 px-2 nav-link d-flex align-items-center"
                  >
                    <img
                      src={Cart}
                      alt="profile"
                      height={18}
                      className="pe-1"
                    />
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

            <div
              className="collapse navbar-collapse"
              id="navbarLeftAlignExample"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100 align-items-center">
                <li
                  className="nav-link text-dark list-group-item py-2"
                  type="button"
                  aria-expanded="false"
                  onClick={() => this.toggleDropdown()}
                >
                  Categories
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
        <ul
          id="categories-dropdown"
          className={`dropdown-menu rounded-0 px-0 ${
            dropdownVisible ? "show" : ""
          }`}
        >
          <div className="container pt-2 pb-5 px-0">
            <div className="row gx-2">
              <div className="col-3">
                <li>
                  <a className="dropdown-item category-menu" href="/products">
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item category-menu"
                    href="/products/category/1/arduino"
                  >
                    Arduino
                  </a>
                  <a
                    className="dropdown-item category-sub"
                    href="/products/category/8/arduino-microcontrollers"
                  >
                    Arduino Microcontrollers
                  </a>
                  <a
                    className="dropdown-item category-sub"
                    href="/products/category/9/arduino-kits"
                  >
                    Arduino Kits
                  </a>
                  <a
                    className="dropdown-item category-sub"
                    href="/products/category/10/arduino-accessories"
                  >
                    Arduino Accessories
                  </a>
                  <a
                    className="dropdown-item category-sub"
                    href="/products/category/11/arduino-shields"
                  >
                    Arduino Shields
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item category-menu fw-bold mt-4"
                    href="#"
                  >
                    Raspberry Pi
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Raspberry Pi Microcontrollers
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Raspberry Pi Kits
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Raspberry Pi Accessories
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Raspberry Pi Shields
                  </a>
                </li>
                <li>
                  <a className="dropdown-item category-menu" href="#">
                    Teensy
                  </a>
                </li>
              </div>
              <div className="col-3">
                <li>
                  <a
                    className="dropdown-item category-menu fw-bold mt-4"
                    href="#"
                  >
                    Motors & Drives
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Servo Motors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    DC Motors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Gear Motors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Stepper Motors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Driver Boards
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Brushless Motors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Motor Accessories
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Wheels
                  </a>
                </li>
              </div>
              <div className="col-3">
                <li>
                  <a
                    className="dropdown-item category-menu fw-bold mt-4"
                    href="#"
                  >
                    Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Air Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Current & Voltage Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Flex Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    IR, Light & Imaging Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Liquid Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Motion Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Potentiometer
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Pressure Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Range & Distance Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Sensor Kits
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Sound Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Temperature & Humidity Sensors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Weight Sensors
                  </a>
                </li>
              </div>
              <div className="col-3">
                <li>
                  <a className="dropdown-item category-menu" href="#">
                    Passive & Active Components
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Capacitors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Resistors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Inductors
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item category-menu fw-bold mt-4"
                    href="#"
                  >
                    Semiconductors
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Diodes
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    BJT & IGBT
                  </a>
                  <a className="dropdown-item category-sub" href="#">
                    Transistors
                  </a>
                </li>
              </div>
            </div>
          </div>
        </ul>
      </header>
    );
  }
}

const ShopHeaderWithClickOutside = onClickOutside(ShopHeader);

const clickOutsideConfig = {
  handleClickOutside: (instance) => instance.handleClickOutside,
};

export default onClickOutside(ShopHeaderWithClickOutside, clickOutsideConfig);
