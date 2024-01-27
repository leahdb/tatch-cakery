import React from "react";
import { Route, Routes } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import ShopMain from "./ShopMain";
import PCB from "./PCB";
import Cart from "./Cart";
import ShopFooter from "./ShopFooter";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import ErrorPage404 from "../errors/ErrorPage404";

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
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
};
