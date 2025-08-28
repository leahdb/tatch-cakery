import React, { useEffect, useState } from "react";
import ShopIntro from "./ShopIntro";
import ProductsMain from "./ProductsMain";
import ShopFooter from "./ShopFooter";
import { fetch_shop_home } from "../../services/shop/home";

const ShopMain = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch_shop_home().then((res) => {
        if (res.status === "ok") {
          setProducts(res.products);
          setBanners(res.banners);
          setCategories(res.categories);
        }
      });
    }, []);

  return (
    <section>
      <ShopIntro banners={ banners } />
      <ProductsMain categories={ categories } products={ products } />
      <ShopFooter />
    </section>
  );
};

export default ShopMain;
