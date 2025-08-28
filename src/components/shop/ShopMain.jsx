import React, { useEffect, useState } from "react";
import ShopIntro from "./ShopIntro";
import ProductsMain from "./ProductsMain";
import ShopFooter from "./ShopFooter";

const ShopMain = ({products, banners, categories}) => {
  return (
    <section>
      <ShopIntro banners={ banners } />
      <ProductsMain categories={ categories } products={ products } />
      <ShopFooter />
    </section>
  );
};

export default ShopMain;
