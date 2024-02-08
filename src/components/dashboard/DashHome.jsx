import React from "react";
import { Route, Routes } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import DashboardSideBar from "./DashboardSideBar";
import DashboardHeader from "./DashboardHeader";
import DashboardMain from "./DashboardMain";
import ProductFormPage from "./products/ProductFormPage";
// import ProductViewPage from "./shop/products/ProductViewPage";
import ProductListingPage from "./products/ProductListingPage";
// import OrderListingPage from "./shop/orders/OrderListingPage";
// import AdminSupportPage from "./admin/AdminSupportPage";
// import AdminSettingsPage from "./admin/AdminSettingsPage";
// import AccountManagerForm from "./shop/settings/accountManagerForm";

const DashHome = (props) => {
  const userRole = localStorage.getItem("user_role");
  return (
    <section className="page-section home bg-lightgray position-relative">
      <div className="d-flex flex-grow-1 flex-shrink-1">
        <DashboardSideBar />
        <div
          className={"d-flex flex-column flex-grow-1 page-content-container"}
        >
          <DashboardHeader />
          <PageRoutes userRole={userRole} />
        </div>
      </div>
    </section>
  );
};

export default DashHome;

const PageRoutes = ({ userRole }) => {
  return (
    <Routes>
      {userRole === "super-admin" && (
        <>
          <Route path={"/"} element={<DashboardMain />}></Route>
          {/* <Route path={"/support"} element={<AdminSupportPage />}></Route> */}
          {/* <Route
            path={"/settings/:tabName?"}
            element={<AdminSettingsPage />}
          ></Route> */}
          <Route
            path={"/products/list"}
            element={<ProductListingPage />}
          ></Route>
          <Route path={"/products/add"} element={<ProductFormPage />}></Route>
          <Route
            path={"/products/edit/:id"} element={<ProductFormPage />}></Route>
          {/*<Route
            path={"/products/view/:id"}
            element={<ProductViewPage />}
          ></Route> */}

          {/* <Route path={"/orders"} element={<OrderListingPage />}></Route>
          <Route
            path={"/accounts/add"}
            element={<AccountManagerForm />}
          ></Route>
          <Route
            path={"/accounts/edit/:id"}
            element={<AccountManagerForm />}
          ></Route> */}
        </>
      )}
    </Routes>
  );
};
