import React from "react";
import onClickOutside from "react-onclickoutside";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";
import Bag from "../../resources/themes/dashboard-v1/icons/bag.svg";
import { Navigate } from "react-router-dom";

class ShopHeader extends React.Component {
  state = {
    isLoggedOut: false,
    dropdownVisible: false,
    categories: [],
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
    const { cartCount } = this.props;
    const { isLoggedOut } = this.state;

    if (isLoggedOut) {
      return <Navigate to={"/login"} />;
    }

    return (
      <header className="sticky-top">
        <div className="text-center bg-beige">
          <div className="container">
            <div className="row gy-3 d-flex justify-content-between align-items-center">
              <div className="mt-0 col-lg-2 col-sm-4 col-5">
                <a href="/">
                  <img src={logoBlack} alt="logoBlack" height={50} className="my-4" />
                </a>
              </div>

              <div className="col-lg-2 col-4">
                <div className="d-flex float-end">
                  <a
                    href="/cart"
                    className="py-1 px-2 nav-link d-flex align-items-center"
                  >
                    <img
                      src={Bag}
                      alt="bag"
                      height={25}
                      className="bag-image pe-1"
                      loading="lazy"
                    />
                    {cartCount > 0 && (
                      <span
                        className="cart-count position-absolute color-primary fw-bold"
                        aria-label={`${cartCount} items in cart`}
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const ShopHeaderWithClickOutside = onClickOutside(ShopHeader);

const clickOutsideConfig = {
  handleClickOutside: (instance) => instance.handleClickOutside,
};

export default onClickOutside(ShopHeaderWithClickOutside, clickOutsideConfig);
