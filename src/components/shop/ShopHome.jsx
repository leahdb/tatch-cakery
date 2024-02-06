import React from "react";
import { Route, Routes } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import ShopMain from "./ShopMain";
import PCB from "./PCB";
import Cart from "./Cart";
import WishList from "./WishList";
import ShopFooter from "./ShopFooter";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";
import ErrorPage404 from "../errors/ErrorPage404";
import "react-toastify/dist/ReactToastify.css";

const ShopHome = (props) => {
  return (
    <section>
      <ShopHeader />
      <ShopRoutes />
      <ShopFooter />
    </section>
  );
};

export default ShopHome;

const ShopRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopMain />} />
      <Route path="/pcb-builder" element={<PCB />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/*" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
};
