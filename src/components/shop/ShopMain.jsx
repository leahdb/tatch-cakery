import React, { useEffect, useState } from "react";
import ShopIntro from "./ShopIntro";
import ProductsMain from "./ProductsMain";
import BuildYourCake from "./BuildYourCake";
import ShopFooter from "./ShopFooter";
import { fetch_shop_home } from "../../services/shop/home";

const response = {
  banners: [
    {
      id: 1,
      image: "dubai.JPEG",
      title: "Delicious Cakes",
      description: "Freshly baked just for you.",
      buttonText: "Order Now",
      buttonLink: "/cakes",
    },
    {
      id: 2,
      image: "korean.JPEG",
      title: "Special Occasions",
      description: "Cakes for every celebration.",
    },
    {
      id: 3,
      image: "tiramisu.JPEG",
      title: "Custom Designs",
      description: "Made to match your style.",
      buttonText: "Customize",
      buttonLink: "/customize",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Special Flavors",
      slug: "special-flavors",
    },
    {
      id: 2,
      name: "Sweetheart Collection",
      slug: "sweetheart-collection",
    },
    {
      id: 3,
      name: "Build Your Cake",
      slug: "build-your-cake",
    },
  ],
  products: [
    {
      id: 1,
      name: "Dubai Chocolate Cake",
      slug: "dubai-chocolate-cake",
      description:
        "A moist chocolate cake, filled with rich kunafa pistachio filling, splurged in our belgium chocolate ganache, topped with finely chopped pistachios for a delightful crunch.",
      price: 12,
      image: "dubai.JPEG",
      category_id: 1,
    },
    {
      id: 2,
      name: "Korean Strawberry Cake",
      slug: "korean-strawberry-cake",
      description:
        "A delicate Korean-style strawberry cake featuring sliced strawberry border, hiding layers of fluffy vanilla sponge cake, diced fresh strawberries, and light whipped white chocolate ganache. Perfect for those who love a fresh and fruity dessert.",
      price: 11,
      image: "korean.JPEG",
      category_id: 1,
    },
    {
      id: 3,
      name: "Tiramisu Cake",
      slug: "tiramisu-cake",
      description:
        "An exquisite twist on the classic Italian tiramisu, this cake is made with layers of coffee-soaked vanilla sponge cake, mascarpone cream, and a dusting of belgium cocoa powder for a rich and satisfying flavor.",
      price: 10,
      image: "tiramisu.JPEG",
      category_id: 1,
    },
    {
      id: 1,
      name: "Dubai Chocolate Cake",
      slug: "dubai-chocolate-cake",
      description:
        "A moist chocolate cake, filled with rich kunafa pistachio filling, splurged in our belgium chocolate ganache, topped with finely chopped pistachios for a delightful crunch.",
      price: 12,
      image: "dubai.JPEG",
      category_id: 2,
    },
    {
      id: 2,
      name: "Korean Strawberry Cake",
      slug: "korean-strawberry-cake",
      description:
        "A delicate Korean-style strawberry cake featuring sliced strawberry border, hiding layers of fluffy vanilla sponge cake, diced fresh strawberries, and light whipped white chocolate ganache. Perfect for those who love a fresh and fruity dessert.",
      price: 11,
      image: "korean.JPEG",
      category_id: 2,
    },
    {
      id: 2,
      name: "Build your Cake",
      slug: "build-your-cake",
      description:
        "A delicate Korean-style strawberry cake featuring sliced strawberry border, hiding layers of fluffy vanilla sponge cake, diced fresh strawberries, and light whipped white chocolate ganache. Perfect for those who love a fresh and fruity dessert.",
      price: 11,
      image: "korean.JPEG",
      category_id: 3,
    },
  ],
};


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
      <BuildYourCake />
      <ShopFooter />
    </section>
  );
};

export default ShopMain;
