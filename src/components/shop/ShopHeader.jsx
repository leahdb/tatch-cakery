import React from "react";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";
import Cart from "../../resources/themes/dashboard-v1/icons/cart.svg";

const ShopHeader = () => {
  return (
    <header className="bg-white border-bottom">
      <div className="container">
        <div className="row align-items-center py-3" style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo Section */}
          <div className="col-auto" style={{ marginLeft: "0" }}>
            <a href="/">
              <img src={logoBlack} alt="Shop Logo" height="65" />
            </a>
          </div>

          {/* Cart Button */}
          <div className="col-auto" style={{ marginLeft: "auto", marginRight: "0" }}>
            <a
              href="/cart" 
              className="btn btn-outline-dark d-flex align-items-center transition-transform hover-shadow"
              style={{
                borderColor: "#604f3f", 
                color: "#604f3f", 
                backgroundColor: "transparent", 
                fontWeight: "bold", 
                padding: "10px 20px", 
                borderRadius: "5px", 
                transition: "background-color 0.3s ease, border-color 0.3s ease", 
              }}
            >
              <img src={Cart} alt="Cart" height="20" className="me-2" />
              <span>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
