import LoginPage from "./components/login/LoginPage";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import ErrorPage404 from "./components/errors/ErrorPage404";
import PrivateRoutes from "./components/PrivateRoutes";
import DashHome from "./components/dashboard/DashHome";
import ShopHome from "./components/shop/ShopHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage404 />} />
        <Route element={<PrivateRoutes />}>
          <Route path={"/admin"} element={<DashHome />} />
          <Route path={"/"} element={<ShopHome />} />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
