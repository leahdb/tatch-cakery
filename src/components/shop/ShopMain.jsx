import React from "react";
import ShopIntro from "./ShopIntro";
import NewestProducts from "./NewestProducts";
import ChooseUs from "./ChooseUs";
import BlogsPreview from "./BlogsPreview";

const ShopMain = () => {
  return (
    <section className="pt-3">
        <ShopIntro />
        <NewestProducts />
        <ChooseUs />
        <BlogsPreview />
    </section>
  );
};

export default ShopMain;
