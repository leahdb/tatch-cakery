import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import useLocalState from "@phntms/use-local-state";

const PrivateRoutes = () => {
  const [userLoggedIn] = useLocalState("user_logged_in");
  return userLoggedIn === true ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
