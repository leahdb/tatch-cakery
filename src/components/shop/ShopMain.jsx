import React, { useEffect, useState } from "react";
import LoadingScreen from "../common/LoadingScreen";
import { fetch_shop_home } from "../../services/shop/home";
import ShopIntro from "./ShopIntro";
import CategoryNav from "./CategoryNav";
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
    return <LoadingScreen />;
  }
  return (
    <section>
      <ShopIntro banners={ banners } />
      <CategoryNav categories={ categories } products={ products } />
      <ProductsMain categories={ categories } products={ products } />
      <ShopFooter />
    </section>
  );
}
