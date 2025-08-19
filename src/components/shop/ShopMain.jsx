import React from "react";
import ShopIntro from "./ShopIntro";
import ProductsMain from "./ProductsMain";
import BuildYourCake from "./BuildYourCake";
import ShopFooter from "./ShopFooter";
import { fetch_shop_home } from "../../services/shop/home";


const ShopMain = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch_shop_home().then((res) => {
        if (res.status === "ok") {
          if (res.data){
            setProducts(res.products);
            setBanners(res.banners);
            setCategories(res.categories);
          }
        }
      });
    }, []);

  return (
    <section>
      <ShopIntro banners={ banners } />
      <ProductsMain categories={ categories } products={ products } />
      {/* <BuildYourCake /> */}
      <ShopFooter />
    </section>
  );
};

export default ShopMain;
