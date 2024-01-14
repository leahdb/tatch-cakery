import React, { useState, useEffect } from "react";
import iconMenu from "../../resources/themes/dashboard-v1/icons/menu.svg";
import avatar from "../../resources/themes/dashboard-v1/icons/avatar.svg";
import iconArrowDown from "../../resources/themes/dashboard-v1/icons/arrow-down.svg";
import { Link } from "react-router-dom";
import SearchBar from "../common/SearchBar";

const DashboardHeader = () => {
  let userFirstName = localStorage["user_first_name"];
  let userAvatar = localStorage["user_picture"];
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const openCloseSidebar = () => {
    const sidebar = document.getElementById("dashboard-sidebar");
    console.log(sidebar)
    sidebar.classList.toggle("open");
  };

  return (
    <div className="d-flex flex-md-row flex-column align-items-center dashboard-header bg-white">
      <div className="menu d-flex full-width justify-content-end mobile-only">
        <button onClick={openCloseSidebar}>
          <img
              src={iconMenu}
              alt="menu"
              key={-1}
          />
        </button>
      </div>
      <div className="no-print d-flex flex-sm-row flex-column-reverse align-items-center flex-grow-1 w-100">
        <SearchBar type="header" resultType="top" />

        <div className="d-flex align-items-center ms-sm-4 ms-0 mb-sm-0 mb-4">
          <div className="dropdown">
            <div
              className="d-flex align-items-center"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {imageError ? (
                <img className="me-3" src={avatar} alt="Dummy Image" />
              ) : (
                <img
                  className="avatar-profile-pic me-3"
                  src={userAvatar}
                  alt="Avatar"
                  width={50}
                  onError={handleImageError}
                />
              )}
              <div className="me-3">
                <p className="fw-bold mb-1">{userFirstName}</p>
                <p className="text-secondary fs-12 mb-0">Admin</p>
              </div>

              <img src={iconArrowDown} alt="arrow-down" />
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
  );
};

export default DashboardHeader;
