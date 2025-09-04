import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ShopIntro from "./ShopIntro";
import ProductsMain from "./ProductsMain";
import ShopFooter from "./ShopFooter";

export default function ShopMain() {
  const { setCartCount, products, banners, categories } = useOutletContext();
  return (
    <section>
      <ShopIntro banners={ banners } />
      <ProductsMain categories={ categories } products={ products } />
      <ShopFooter />
    </section>
  );
}
