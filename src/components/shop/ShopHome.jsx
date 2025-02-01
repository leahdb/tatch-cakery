import React from "react";
import { Route, Routes } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import ShopMain from "./ShopMain";
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

const ShopHome = (props) => {
  localStorage.setItem("category_refresh", false);
  return (
    <section>
      <ShopHeader />
      <ShopRoutes />
      <WhatsAppButton />
    </section>
  );
};

export default ShopHome;

const ShopRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopMain />} />
      <Route path="/build-cake" element={<CakeCustomization /> } />
      <Route path="/pcb-builder" element={<PCB />} />
      <Route path="/products" element={<ProductListing />} />
      <Route
        path="/products/category/:categoryId/:categorySlug"
        element={<ProductListing />}
      />
      <Route
        path="/products/:productId/:productName"
        element={<ProductDetails />}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
};
