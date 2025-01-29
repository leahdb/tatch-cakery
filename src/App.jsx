import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShopHome from "./components/shop/ShopHome";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import CartPage from "./components/shop/CartPage";
import PrivateRoutes from "./components/PrivateRoutes"; // for admin login
import DashHome from "./components/dashboard/DashHome";
import { ToastContainer } from "react-toastify";
import SpongePage from "./components/shop/SpongePage";
import CakeSizePage from "./components/shop/CakeSizePage";
import FillingPage from "./components/shop/FillingPage";
import ShopHeader from "./components/shop/ShopHeader"; // Import Header
import ShopFooter from "./components/shop/ShopFooter"; // Import Footer
import { CustomerSelectionProvider } from "./components/shop/CustomerSelectionContext";
import DecorationsPage from "./components/shop/DecorationsPage";
import ReviewOrderPage from "./components/shop/ReviewOrderPage";

function App() {
  return (
    <CustomerSelectionProvider>
    <Router>
      <ToastContainer />
      <ShopHeader /> {/* Header always visible */}
      <Routes>
        <Route path="/" element={<ShopHome />} />
        <Route path="/customize/size" element={<CakeSizePage />} />
        <Route path="/customize/sponge/:size" element={<SpongePage />} />
        <Route path="/customize/filling/:size" element={<FillingPage />} />
        <Route path="/customize/decorations/:size" element={<DecorationsPage />} />
        <Route path="/customize/review/:size" element={<ReviewOrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<DashHome />} />
        </Route>
      </Routes>
      <ShopFooter /> {/* Footer always visible */}
    </Router>
    </CustomerSelectionProvider>
  );
}

export default App;
