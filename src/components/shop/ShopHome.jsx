import { Link } from "react-router-dom";
import CakeSizePage from "./CakeSizePage"; 
import ShopHeader from "./ShopHeader"; 
import ShopIntro from "./ShopIntro"; 
import ShopFooter from "./ShopFooter"; 
import ChooseUs from "./ChooseUs";
import BlogsPreview from "./BlogsPreview";
import SpongePage from "./SpongePage";


const ShopHome = () => {
  return (
    <section>
       {/* <ShopHeader /> */}
      <ShopIntro />
      <CakeSizePage />
      {/* <SpongePage /> */}
      {/* <ChooseUs /> */}
      {/* <BlogsPreview /> */}
      {/* <ShopFooter /> */}
    </section>
  );
};

export default ShopHome;
