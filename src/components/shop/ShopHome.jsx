import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import ShopMain from "./ShopMain";
import ComingSoon from "./ComingSoon";
import PCB from "./PCB";
import Cart from "./Cart";
import WishList from "./WishList";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";
import WhatsAppButton from "./WhatsAppButton";
import CakeCustomization from "./CakeCustomization";
import ErrorPage404 from "../errors/ErrorPage404";
import "react-toastify/dist/ReactToastify.css";
import { fetch_cart } from "../../services/shop/cart";

const ShopHome = (props) => {
  const [cartCount, setCartCount] = useState(0);
  localStorage.setItem("category_refresh", false);

  useEffect(() => {
    fetch_cart().then((res) => {
      setCartCount(res.total_items);
    });
  }, []);

  return (
    <section className="page bg-light-beige">
      {" "}
      {/* comingsoonsec d-flex align-items-center justify-content-center */}
      <ShopHeader cartCount={cartCount}/>
      <ShopRoutes setCartCount={setCartCount}/>
      <WhatsAppButton />
    </section>
  );
};

export default ShopHome;

const ShopRoutes = ({setCartCount}) => {
  return (
    <Routes>
      <Route path="/" element={<ShopMain />} />
      <Route path="/main" element={<ShopMain />} />
      <Route path="/build-your-cake" element={<CakeCustomization />} />
      <Route path="/products" element={<ProductListing />} />
      <Route
        path="/products/category/:categoryId/:categorySlug"
        element={<ProductListing />}
      />
      <Route
        path="/products/:slug"
        element={<ProductDetails />}
        setCartCount={setCartCount}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
};
