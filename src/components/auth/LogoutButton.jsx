import { useState } from "react";
import { Navigate } from "react-router-dom";
import { unauthenticate } from "../../services/auth";

const LogoutButton = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const logout = () => {
    unauthenticate().then((response) => {
      setIsLoggedOut(response.status === "ok");
    });
  };

  if (isLoggedOut) {
    return <Navigate to={"/login"} />;
  }

  return (
    <button className={"btn btn-block btn-primary"} onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
