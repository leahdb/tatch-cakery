import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { fetch_shop_home } from "../../services/shop/home";
import ShopIntro from "./ShopIntro";
import ProductsMain from "./ProductsMain";
import ShopFooter from "./ShopFooter";

export default function ShopMain() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch_shop_home().then((res) => {
      if (res.status === "ok") {
        setProducts(res.products || []);
        setBanners(res.banners || []);
        setCategories(res.categories || []);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <DotLottieReact
          src="https://lottie.host/610317e0-ecdf-497f-9224-6fed273a4574/UVCpOZhutB.lottie"
          loop
          autoplay
          style={{height: "auto"}}
        />
      </div>
    );
  }
  return (
    <section>
      <ShopIntro banners={ banners } />
      <ProductsMain categories={ categories } products={ products } />
      <ShopFooter />
    </section>
  );
}
