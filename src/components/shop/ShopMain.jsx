import React from "react";
import ShopIntro from "./ShopIntro";
import NewestProducts from "./NewestProducts";
import SpecialFlavors from "./SpecialFlavors";
import BuildYourCake from "./BuildYourCake";

const ShopMain = () => {
  return (
    <section>
        <ShopIntro />
        <NewestProducts />
        <SpecialFlavors />
        <BuildYourCake />
    </section>
  );
};

export default ShopMain;
