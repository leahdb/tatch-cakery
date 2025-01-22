import React, { useEffect, useState } from "react";
import iconLogout from "../../resources/themes/dashboard-v1/icons/logout.svg";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";
import { circleXIcon } from "../../resources/themes/dashboard-v1/icons/icons";

const icons = {
  Dashboard: (
    <svg
      className="me-3 icon pe-none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 14.69C6.59 14.69 6.25 14.35 6.25 13.94V10.73C6.25 10.32 6.59 9.97998 7 9.97998C7.41 9.97998 7.75 10.32 7.75 10.73V13.94C7.75 14.36 7.41 14.69 7 14.69Z"
        fill="#5A5A5A"
      />
      <path
        d="M12 16.43C11.59 16.43 11.25 16.09 11.25 15.68V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V15.68C12.75 16.09 12.41 16.43 12 16.43Z"
        fill="#5A5A5A"
      />
      <path
        d="M17 14.69C16.59 14.69 16.25 14.35 16.25 13.94V10.73C16.25 10.32 16.59 9.97998 17 9.97998C17.41 9.97998 17.75 10.32 17.75 10.73V13.94C17.75 14.36 17.41 14.69 17 14.69Z"
        fill="#5A5A5A"
      />
      <path
        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
        fill="#5A5A5A"
      />
    </svg>
  ),
  Products: (
    <svg
      className="me-3 icon pe-none"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.19 17.75H7.53999C6.54999 17.75 5.59999 17.33 4.92999 16.6C4.25999 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.74999 3.33001 4.53999 3.10001C4.32999 2.87001 4.04 2.75 3.73 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H3.74001C4.47001 1.25 5.15999 1.56 5.64999 2.09C5.91999 2.39 6.12 2.74 6.23 3.13H18.72C19.73 3.13 20.66 3.53 21.34 4.25C22.01 4.98 22.35 5.93 22.27 6.94L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75ZM6.28 4.62L5.5 14.02C5.45 14.6 5.64 15.15 6.03 15.58C6.42 16.01 6.95999 16.24 7.53999 16.24H18.19C19.23 16.24 20.17 15.36 20.25 14.32L20.79 6.82001C20.83 6.23001 20.64 5.67001 20.25 5.26001C19.86 4.84001 19.32 4.60999 18.73 4.60999H6.28V4.62Z"
        fill="#5A5A5A"
      />
      <path
        d="M16.25 22.75C15.15 22.75 14.25 21.85 14.25 20.75C14.25 19.65 15.15 18.75 16.25 18.75C17.35 18.75 18.25 19.65 18.25 20.75C18.25 21.85 17.35 22.75 16.25 22.75ZM16.25 20.25C15.97 20.25 15.75 20.47 15.75 20.75C15.75 21.03 15.97 21.25 16.25 21.25C16.53 21.25 16.75 21.03 16.75 20.75C16.75 20.47 16.53 20.25 16.25 20.25Z"
        fill="#5A5A5A"
      />
      <path
        d="M8.25 22.75C7.15 22.75 6.25 21.85 6.25 20.75C6.25 19.65 7.15 18.75 8.25 18.75C9.35 18.75 10.25 19.65 10.25 20.75C10.25 21.85 9.35 22.75 8.25 22.75ZM8.25 20.25C7.97 20.25 7.75 20.47 7.75 20.75C7.75 21.03 7.97 21.25 8.25 21.25C8.53 21.25 8.75 21.03 8.75 20.75C8.75 20.47 8.53 20.25 8.25 20.25Z"
        fill="#5A5A5A"
      />
      <path
        d="M21 8.75H9C8.59 8.75 8.25 8.41 8.25 8C8.25 7.59 8.59 7.25 9 7.25H21C21.41 7.25 21.75 7.59 21.75 8C21.75 8.41 21.41 8.75 21 8.75Z"
        fill="#5A5A5A"
      />
    </svg>
  ),
  Orders: (
    <svg
      className="me-3 icon pe-none"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9994 13.2999C11.8694 13.2999 11.7394 13.2699 11.6194 13.1999L2.78936 8.0899C2.42936 7.8799 2.30934 7.41987 2.51934 7.05987C2.72934 6.69987 3.17934 6.57985 3.54934 6.78985L11.9994 11.6799L20.3993 6.81988C20.7593 6.60988 21.2193 6.7399 21.4293 7.0899C21.6393 7.4499 21.5094 7.90987 21.1594 8.11987L12.3894 13.1999C12.2594 13.2599 12.1294 13.2999 11.9994 13.2999Z"
        fill="#5A5A5A"
      />
      <path
        d="M12 22.36C11.59 22.36 11.25 22.02 11.25 21.61V12.54C11.25 12.13 11.59 11.79 12 11.79C12.41 11.79 12.75 12.13 12.75 12.54V21.61C12.75 22.02 12.41 22.36 12 22.36Z"
        fill="#5A5A5A"
      />
      <path
        d="M12.0006 22.75C11.1206 22.75 10.2506 22.56 9.56061 22.18L4.22062 19.21C2.77062 18.41 1.64062 16.48 1.64062 14.82V9.16998C1.64062 7.50998 2.77062 5.59002 4.22062 4.78002L9.56061 1.82C10.9306 1.06 13.0706 1.06 14.4406 1.82L19.7806 4.78997C21.2306 5.58997 22.3606 7.51999 22.3606 9.17999V14.83C22.3606 16.49 21.2306 18.41 19.7806 19.22L14.4406 22.18C13.7506 22.56 12.8806 22.75 12.0006 22.75ZM12.0006 2.74999C11.3706 2.74999 10.7506 2.88 10.2906 3.13L4.95063 6.09997C3.99063 6.63997 3.14062 8.06999 3.14062 9.17999V14.83C3.14062 15.93 3.99063 17.37 4.95063 17.91L10.2906 20.88C11.2006 21.39 12.8006 21.39 13.7106 20.88L19.0506 17.91C20.0106 17.37 20.8606 15.94 20.8606 14.83V9.17999C20.8606 8.07999 20.0106 6.63997 19.0506 6.09997L13.7106 3.13C13.2506 2.88 12.6306 2.74999 12.0006 2.74999Z"
        fill="#5A5A5A"
      />
      <path
        d="M17.0012 13.99C16.5912 13.99 16.2512 13.65 16.2512 13.24V10.0201L7.13116 4.76007C6.77116 4.55007 6.65114 4.09005 6.86114 3.74005C7.07114 3.38005 7.52116 3.26003 7.88116 3.47003L17.3712 8.95007C17.6012 9.08007 17.7512 9.33003 17.7512 9.60003V13.2601C17.7512 13.6501 17.4112 13.99 17.0012 13.99Z"
        fill="#5A5A5A"
      />
    </svg>
  ),
  Search: (
    <svg
      className="me-3 icon pe-none"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.58329 18.1251C4.87496 18.1251 1.04163 14.2917 1.04163 9.58342C1.04163 4.87508 4.87496 1.04175 9.58329 1.04175C14.2916 1.04175 18.125 4.87508 18.125 9.58342C18.125 14.2917 14.2916 18.1251 9.58329 18.1251ZM9.58329 2.29175C5.55829 2.29175 2.29163 5.56675 2.29163 9.58342C2.29163 13.6001 5.55829 16.8751 9.58329 16.8751C13.6083 16.8751 16.875 13.6001 16.875 9.58342C16.875 5.56675 13.6083 2.29175 9.58329 2.29175Z"
        fill="#5A5A5A"
      />
      <path
        d="M18.3337 18.9583C18.1753 18.9583 18.017 18.9 17.892 18.775L16.2253 17.1083C15.9837 16.8666 15.9837 16.4666 16.2253 16.225C16.467 15.9833 16.867 15.9833 17.1087 16.225L18.7753 17.8916C19.017 18.1333 19.017 18.5333 18.7753 18.775C18.6503 18.9 18.492 18.9583 18.3337 18.9583Z"
        fill="#5A5A5A"
      />
    </svg>
  ),
  Reports: (
    <svg
      className="me-3 icon pe-none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4 22.75H7.6C3.21 22.75 1.25 20.79 1.25 16.4V12.6C1.25 8.21 3.21 6.25 7.6 6.25H10.6C11.01 6.25 11.35 6.59 11.35 7C11.35 7.41 11.01 7.75 10.6 7.75H7.6C4.02 7.75 2.75 9.02 2.75 12.6V16.4C2.75 19.98 4.02 21.25 7.6 21.25H11.4C14.98 21.25 16.25 19.98 16.25 16.4V13.4C16.25 12.99 16.59 12.65 17 12.65C17.41 12.65 17.75 12.99 17.75 13.4V16.4C17.75 20.79 15.79 22.75 11.4 22.75Z"
        fill="#5A5A5A"
      />
      <path
        d="M16.9996 14.1505H13.7996C10.9896 14.1505 9.84961 13.0105 9.84961 10.2005V7.00048C9.84961 6.70048 10.0296 6.42048 10.3096 6.31048C10.5896 6.19048 10.9096 6.26048 11.1296 6.47048L17.5296 12.8705C17.7396 13.0805 17.8096 13.4105 17.6896 13.6905C17.5796 13.9705 17.2996 14.1505 16.9996 14.1505ZM11.3496 8.81048V10.2005C11.3496 12.1905 11.8096 12.6505 13.7996 12.6505H15.1896L11.3496 8.81048Z"
        fill="#5A5A5A"
      />
      <path
        d="M15.5996 2.75H11.5996C11.1896 2.75 10.8496 2.41 10.8496 2C10.8496 1.59 11.1896 1.25 11.5996 1.25H15.5996C16.0096 1.25 16.3496 1.59 16.3496 2C16.3496 2.41 16.0096 2.75 15.5996 2.75Z"
        fill="#5A5A5A"
      />
      <path
        d="M7 5.75C6.59 5.75 6.25 5.41 6.25 5C6.25 2.93 7.93 1.25 10 1.25H12.62C13.03 1.25 13.37 1.59 13.37 2C13.37 2.41 13.03 2.75 12.62 2.75H10C8.76 2.75 7.75 3.76 7.75 5C7.75 5.41 7.41 5.75 7 5.75Z"
        fill="#5A5A5A"
      />
      <path
        d="M19.1895 17.75C18.7795 17.75 18.4395 17.41 18.4395 17C18.4395 16.59 18.7795 16.25 19.1895 16.25C20.3295 16.25 21.2495 15.32 21.2495 14.19V8C21.2495 7.59 21.5895 7.25 21.9995 7.25C22.4095 7.25 22.7495 7.59 22.7495 8V14.19C22.7495 16.15 21.1495 17.75 19.1895 17.75Z"
        fill="#5A5A5A"
      />
      <path
        d="M22 8.75048H19C16.34 8.75048 15.25 7.66048 15.25 5.00048V2.00048C15.25 1.70048 15.43 1.42048 15.71 1.31048C15.99 1.19048 16.31 1.26048 16.53 1.47048L22.53 7.47048C22.74 7.68048 22.81 8.01048 22.69 8.29048C22.58 8.57048 22.3 8.75048 22 8.75048ZM16.75 3.81048V5.00048C16.75 6.83048 17.17 7.25048 19 7.25048H20.19L16.75 3.81048Z"
        fill="#5A5A5A"
      />
    </svg>
  ),
  Shop: (
    <svg
      id="SvgjsSvg1020"
      xmlns="http://www.w3.org/2000/svg"
      className="me-3 icon pe-none"
      width="23"
      height="23"
      viewBox="0 0 24 24"
    >
      <path
        d="M23.82,7.99l-.04-.14s-.04-.04-.04-.07L21.18,.56c-.11-.35-.42-.56-.81-.56H3.7c-.35,0-.67,.21-.81,.56L.28,7.74s-.04,.07-.04,.14l-.11,.25c-.04,.07-.04,.14-.04,.21-.07,.32-.11,.6-.11,.84,0,1.55,.99,2.89,2.39,3.41v10.56c0,.46,.39,.84,.84,.84H21.11c.46,0,.84-.39,.84-.84V12.46c1.2-.6,2.04-1.83,2.04-3.27,0-.25-.04-.53-.11-.81,.04-.14,0-.25-.07-.39Zm-3.52,14.32H4.12V12.81s.11-.04,.14-.04c.88-.14,1.65-.6,2.22-1.27,.67,.81,1.65,1.3,2.78,1.3s2.11-.49,2.78-1.3c.67,.81,1.65,1.3,2.78,1.3s2.11-.49,2.78-1.3c.49,.56,1.13,.99,1.87,1.2h.04c.07,.04,.18,.04,.25,.04,.04,0,.11,.04,.14,.04,.07,0,.14,0,.21,.04h.14v9.5h.07Zm.63-11.26c-.11,.04-.18,.04-.25,.07-.11,0-.18,.04-.28,.04-.14,0-.25,0-.39-.04-.11-.04-.21-.04-.28-.11h-.04c-.67-.28-1.16-.91-1.2-1.65v-.14c0-.46-.39-.84-.84-.84s-.88,.35-.88,.81v.18c-.07,.74-.56,1.37-1.2,1.65h-.04l-.32,.11h-.42c-.14,0-.25,0-.39-.04-.11-.04-.21-.04-.28-.11h-.04c-.67-.28-1.16-.91-1.2-1.65v-.14c0-.46-.39-.84-.84-.84s-.84,.39-.84,.84v.18c-.07,.74-.56,1.37-1.2,1.65h-.04l-.32,.11h-.42c-.11,0-.25,0-.39-.04-.11-.04-.21-.04-.32-.11h-.04c-.67-.28-1.16-.91-1.2-1.65v-.14c0-.46-.39-.84-.84-.84s-.84,.39-.84,.84v.18c-.07,.74-.56,1.37-1.2,1.65h-.04c-.11,.04-.21,.07-.28,.11h-.46c-.07,0-.14,0-.21-.04h-.11c-.91-.18-1.62-.95-1.62-1.9,0-.14,.04-.32,.11-.53,0-.04,0-.07,.04-.07L4.33,1.72h15.48l2.39,6.69s0,.04,.04,.07l.04,.14s0,.07,.04,.07c.07,.21,.11,.39,.11,.53-.07,.84-.67,1.58-1.48,1.83Z"
        fill="#5a5b5b"
      />
      <path
        d="M9.6,22.31v-4.75c0-.48,.39-.87,.87-.87h3.19c.48,0,.87,.39,.87,.87v4.75"
        fill="none"
        stroke="#5a5b5b"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  ),
};
const getIconForTitle = (title) => {
  if (icons[title] !== undefined) {
    return icons[title];
  }

  // default to this icon
  return icons["Dashboard"];
};

const DashboardSideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    let menusItems = [
      { title: "Dashboard", link: "/admin" },
      { title: "Products", link: "/admin/products/list" },
      { title: "Orders", link: "/admin/orders/list" },
    ];
    const currentPath = window.location.pathname;
    setMenus(menusItems);
    let possibleSelectedIndex = 0;
    let foundExactMatchLink = false;
    for (let i = 0; i < menusItems.length; i++) {
      if (menusItems[i].link === currentPath) {
        setSelectedIndex(i);
        foundExactMatchLink = true;
        break;
      } else if (currentPath.includes(menusItems[i].link)) {
        possibleSelectedIndex = i;
      }
    }

    if (!foundExactMatchLink && possibleSelectedIndex > 0) {
      setSelectedIndex(possibleSelectedIndex);
    }
  }, []);

  let renderedRoleMenus = {};
  const closeSideBar = () => {
    const sidebar = document.getElementById("dashboard-sidebar");
    sidebar.classList.toggle("open");
  };
  return (
    <div id="dashboard-sidebar" className={"bg-white dashboard-sidebar"}>
      <div
        className={
          "d-flex justify-content-end mobile-only menu-close-container"
        }
      >
        <span onClick={closeSideBar}>{circleXIcon}</span>
      </div>
      <div className="dashboard-logo p-0 d-flex justify-content-center">
        <img src={logoBlack} alt="logoBlack" />
      </div>
      <ul className="no-print bg-white px-4 flex-1 pt-5">
        {menus.map((menu, index) => {
          if (menu.role && renderedRoleMenus[menu.role] === undefined) {
            renderedRoleMenus[menu.role] = true;
          } else if (menu.role) {
            return <div key={index}></div>;
          }
          if (menu.submenu) {
            return (
              <div key={index}>
                <li
                  className="list-item d-flex align-items-center py-sm-3 py-2 px-4 pe-5 collapsed position-relative submenu-item"
                  data-bs-toggle="collapse"
                  data-bs-target={`#details-collapse`}
                >
                  {getIconForTitle(menu.title)}
                  <p className="m-0 fw-bold pe-none submenu-role">
                    {menu.title}
                  </p>
                  <div className="d-flex justify-content-end">
                    <svg
                      className="icon ms-4 pe-none caret"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99975 5.29993C8.46642 5.29993 8.93308 5.47993 9.28641 5.83326L13.6331 10.1799C13.8264 10.3733 13.8264 10.6933 13.6331 10.8866C13.4397 11.08 13.1197 11.08 12.9264 10.8866L8.57975 6.54001C8.25975 6.22001 7.73975 6.22001 7.41975 6.54001L3.0731 10.8866C2.87977 11.08 2.55977 11.08 2.36644 10.8866C2.1731 10.6933 2.1731 10.3733 2.36644 10.1799L6.71308 5.83326C7.06642 5.47993 7.53308 5.29993 7.99975 5.29993Z"
                        fill="#A0A0A0"
                      />
                    </svg>
                  </div>
                </li>
                <div
                  className="collapse submenu submenu-items"
                  id={`details-collapse`}
                >
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                    {menu.submenu.map((submenu, subIndex) => (
                      <Link to={submenu.link} key={subIndex}>
                        <li className="list-item d-flex px-4" key={subIndex}>
                          {getIconForTitle(submenu.title)}
                          <p className="m-0">{submenu.title}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            );
          } else if (!menu.role) {
            return (
              <Link to={menu.link} key={index}>
                <li
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                  className={
                    (index === selectedIndex ? "selected-listitem " : "") +
                    "list-item d-flex align-items-center py-sm-3 py-2 px-4  mb-3"
                  }
                >
                  {getIconForTitle(menu.title)}
                  <p className="m-0 fw-bold pe-none">{menu.title}</p>
                </li>
              </Link>
            );
          } else {
            const roleMenus = menus.filter((item) => item.role === menu.role);
            return (
              <div key={index}>
                <li
                  key={index}
                  className="list-item d-flex align-items-center py-sm-3 py-2 px-4 pe-5 collapsed position-relative submenu-item"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${menu.role}-collapse`}
                >
                  {getIconForTitle(menu.role)}
                  <p className="m-0 fw-bold pe-none submenu-role">
                    {menu.role}
                  </p>
                  <div className="d-flex justify-content-end">
                    <svg
                      className="icon ms-4 pe-none caret"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99975 5.29993C8.46642 5.29993 8.93308 5.47993 9.28641 5.83326L13.6331 10.1799C13.8264 10.3733 13.8264 10.6933 13.6331 10.8866C13.4397 11.08 13.1197 11.08 12.9264 10.8866L8.57975 6.54001C8.25975 6.22001 7.73975 6.22001 7.41975 6.54001L3.0731 10.8866C2.87977 11.08 2.55977 11.08 2.36644 10.8866C2.1731 10.6933 2.1731 10.3733 2.36644 10.1799L6.71308 5.83326C7.06642 5.47993 7.53308 5.29993 7.99975 5.29993Z"
                        fill="#A0A0A0"
                      />
                    </svg>
                  </div>
                </li>
                <div
                  key={`submenu-${index}`}
                  className="collapse submenu submenu-items"
                  id={`${menu.role}-collapse`}
                >
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                    {roleMenus.map((submenu, subIndex) => (
                      <Link to={submenu.link} key={subIndex}>
                        <li className="list-item d-flex px-4" key={subIndex}>
                          {getIconForTitle(submenu.title)}
                          <p className="m-0">{submenu.title}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }
        })}

        <LogoutButton preset={"sidebar"} />
      </ul>
    </div>
  );
};

export default DashboardSideBar;
