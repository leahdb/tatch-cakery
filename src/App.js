import LoginPage from "./components/auth/LoginPage";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import DashHome from "./components/dashboard/DashHome";
import ShopHome from "./components/shop/ShopHome";
import ShopMain from "./components/shop/ShopMain";
import ComingSoon from "./components/shop/ComingSoon";
import Cart from "./components/shop/Cart";
import ProductListing from "./components/shop/ProductListing";
import ProductDetails from "./components/shop/ProductDetails";
import Checkout from "./components/shop/Checkout";
import ThankYou from "./components/shop/ThankYou";
import CakeCustomization from "./components/shop/CakeCustomization";
import ErrorPage404 from "./components/errors/ErrorPage404";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        newestOnTop
        hideProgressBar
        closeOnClick
        draggable={false}
        pauseOnHover={false}
        autoClose={3000}
      />

      <Routes>
        {/* SHOP LAYOUT */}
        <Route path="/" element={<ShopHome />}>
          <Route index element={<ShopMain />} />
          <Route path="main" element={<ShopMain />} />
          <Route path="coming-soon" element={<ComingSoon />} />
          <Route path="build-your-cake" element={<CakeCustomization />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="products/category/:categorySlug" element={<ProductListing />} />
          <Route path="products/:slug" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Route>

        {/* ADMIN */}
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<DashHome />} />
          <Route path="/admin/*" element={<DashHome />} />
        </Route>

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;