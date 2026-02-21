import React from "react";
import menu from "../../resources/themes/dashboard-v1/img/tatch-menu.jpg";

const MenuPage = () => {
  return (
    <section className="menu-page">
        <img
          src={menu}
          alt="Tatch Menu"
          style={{
            width: "100%",
            height: "auto",
            display: "block"
          }}
        />
    </section>
  );
};

export default MenuPage;
