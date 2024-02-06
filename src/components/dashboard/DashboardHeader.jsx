import React, { useState, useEffect } from "react";
import iconMenu from "../../resources/themes/dashboard-v1/icons/menu.svg";
import avatar from "../../resources/themes/dashboard-v1/icons/avatar.svg";
import iconArrowDown from "../../resources/themes/dashboard-v1/icons/arrow-down.svg";
import iconSearch from "../../resources/themes/dashboard-v1/icons/search.svg";
import { Link } from "react-router-dom";
//import SearchBar from "../common/SearchBar";

const DashboardHeader = () => {
  let userName = localStorage["user_full_name"];
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const openCloseSidebar = () => {
    const sidebar = document.getElementById("dashboard-sidebar");
    console.log(sidebar)
    sidebar.classList.toggle("open");
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="d-flex flex-md-row flex-column align-items-center dashboard-header bg-white">
      <div className="menu d-flex full-width justify-content-end mobile-only">
        <button onClick={openCloseSidebar}>
          <img src={iconMenu} alt="menu" key={-1} />
        </button>
      </div>
      <div className="row no-print d-flex align-items-center justify-content-between w-100">
        <div className="col-lg-8 col-md-12 col-12 d-flex justify-content-center">
          <div className="w-75 input-group">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search..."
            />
            <button
              type="button"
              className="btn btn-primary shadow-0d-flex align-items-center"
            >
              <img src={iconSearch} alt="search" />
            </button>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex align-items-center justify-content-end ms-sm-4 ms-0 mb-sm-0 mb-4">
            <div className="dropdown">
              <div
                className="d-flex align-items-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="me-3">
                  <p className="fw-bold mb-1">
                    {capitalizeFirstLetter(userName.split(" ")[0])}
                  </p>
                  <p className="text-secondary fs-12 mb-0">Admin</p>
                </div>

                <img src={iconArrowDown} alt="arrow-down" />
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link to={"/admin/settings/user"} className={"dropdown-item"}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
