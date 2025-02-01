import React from "react";
import ShopIntro from "./ShopIntro";
import NewestProducts from "./NewestProducts";
import SpecialFlavors from "./SpecialFlavors";
import BuildYourCake from "./BuildYourCake";
import ShopFooter from "./ShopFooter";

const ShopMain = () => {
  return (
    <section>
      <ShopIntro />
      <NewestProducts />
      <SpecialFlavors />
      <BuildYourCake />
      <ShopFooter />
    </section>
  );
};

export default ShopMain;
