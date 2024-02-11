import { useState } from "react";
import { Navigate } from "react-router-dom";
import { unauthenticate } from "../../services/auth";
import iconLogout from "../../resources/themes/dashboard-v1/icons/logout.svg";

const LogoutButton = ({ preset }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const logout = () => {
    unauthenticate().then((response) => {
      setIsLoggedOut(response.status === "ok");
    });
  };

  if (isLoggedOut) {
    return <Navigate to={"/"} />;
  }

  switch (preset) {
    case "sidebar":
      return (
        <li
          className="list-item d-flex align-items-center py-sm-3 py-2 px-4"
          onClick={logout}
        >
          <img className="me-3" src={iconLogout} alt="logout" />
          <p className="m-0 fw-bold">Log Out</p>
        </li>
      );

    default:
      return (
        <button className={"btn btn-block btn-primary"} onClick={logout}>
          Logout
        </button>
      );
  }
};

export default LogoutButton;
