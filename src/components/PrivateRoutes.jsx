import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import useLocalState from "@phntms/use-local-state";
import ErrorPage404 from "./errors/ErrorPage404";
import DashHome from "./dashboard/DashHome";
import LoginPage from "./login/LoginPage";
import ShopHome from "./shop/ShopHome";

// const PrivateRoutes = () => {
//   const [userLoggedIn] = useLocalState("user_logged_in");
//   return userLoggedIn === true ? <Outlet /> : <Navigate to={"/login"} />;
// };
const PrivateRoutes = () => {
  const [userLoggedIn] = useLocalState("user_logged_in");

  return (
    <Routes>
      <Route
        path="/admin"
        element={userLoggedIn ? <DashHome /> : <ErrorPage404 />}
      />
      <Route path="/" element={<ShopHome />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
};

export default PrivateRoutes;
