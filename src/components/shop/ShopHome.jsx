import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import ShopMain from "./ShopMain";
import ComingSoon from "./ComingSoon";
import Cart from "./Cart";
import WishList from "./WishList";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";
import ThankYou from "./ThankYou";
import WhatsAppButton from "./WhatsAppButton";
import CakeCustomization from "./CakeCustomization";
import ErrorPage404 from "../errors/ErrorPage404";
import "react-toastify/dist/ReactToastify.css";
import { fetch_cart } from "../../services/shop/cart";
import { fetch_shop_home } from "../../services/shop/home";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ShopHome = (props) => {
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  localStorage.setItem("category_refresh", false);

  useEffect(() => {
    fetch_cart().then((res) => {
      setCartCount(res.total_items);
    });
  }, []);

  useEffect(() => {
    fetch_shop_home().then((res) => {
      if (res.status === "ok") {
        setProducts(res.products);
        setBanners(res.banners);
        setCategories(res.categories);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return (
    <div className="d-flex align-items-center" style={{height: "100vh"}}>
      <DotLottieReact
        src="https://lottie.host/610317e0-ecdf-497f-9224-6fed273a4574/UVCpOZhutB.lottie"
        loop
        autoplay
        style={{height: "auto"}}
      />
    </div>
  );

  return (
    <section className="page bg-light-beige">
      {" "}
      {/* comingsoonsec d-flex align-items-center justify-content-center */}
      <ShopHeader cartCount={cartCount}/>
      <ShopRoutes setCartCount={setCartCount} products={products} banners={banners} categories={categories}/>
      <WhatsAppButton />
    </section>
  );
};

export default ShopHome;

const ShopRoutes = ({setCartCount, products, banners, categories}) => {
  return (
    <Routes>
      <Route path="/" element={
        <ShopMain
          setCartCount={setCartCount}
          products={products}
          banners={banners}
          categories={categories}
        />}
      />
      <Route path="/main" element={
        <ShopMain
          setCartCount={setCartCount}
          products={products}
          banners={banners}
          categories={categories}
        />}
      />
      <Route path="/build-your-cake" element={<CakeCustomization />} />
      <Route path="/products" element={<ProductListing />} />
      <Route
        path="/products/category/:categorySlug"
        element={<ProductListing />}
      />
      <Route
        path="/products/:slug"
        element={<ProductDetails setCartCount={setCartCount}/>}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout setCartCount={setCartCount} />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
};
