//import useLocalStorage from "../../services/utils/local-storage";
import LogoutButton from "../login/LogoutButton";
import ShopHeader from "./ShopHeader";
import ShopIntro from "./ShopIntro";

const ShopHome = (props) => {

  return (
    <section>
      <ShopHeader />
      <ShopIntro />
    </section>
  );
};

export default ShopHome;
