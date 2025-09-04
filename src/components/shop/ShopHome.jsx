import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import WhatsAppButton from "./WhatsAppButton";
import { fetch_cart } from "../../services/shop/cart";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ShopHome = () => {
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch_cart().then((res) => setCartCount(res.total_items ?? 0));
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <DotLottieReact
          src="https://lottie.host/610317e0-ecdf-497f-9224-6fed273a4574/UVCpOZhutB.lottie"
          loop
          autoplay
        />
      </div>
    );
  }

  return (
    <section className="page bg-light-beige">
      <ShopHeader cartCount={cartCount} />
      <Outlet context={{ setCartCount, setLoading, setCategories, setBanners, setProducts, products, banners, categories }} />
      <WhatsAppButton />
    </section>
  );
};

export default ShopHome;
