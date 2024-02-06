import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import DashHome from "./components/dashboard/DashHome";
import ShopHome from "./components/shop/ShopHome";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      
      <Routes>
        <Route path={"/*"} element={<ShopHome />} />
        <Route element={<PrivateRoutes />}>
          <Route path={"/admin"} element={<DashHome />} />
          <Route path={"/admin/*"} element={<DashHome />} />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
        //
        <Route path={"/register"} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
