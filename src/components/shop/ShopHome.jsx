import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import WhatsAppButton from "./WhatsAppButton";
import { fetch_cart } from "../../services/shop/cart";

const ShopHome = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    fetch_cart().then((res) => setCartCount(res.total_items ?? 0));
  }, []);

  return (
    <section className="page bg-light-beige">
      <ShopHeader cartCount={cartCount} sticky={!isHomePage} />
      <Outlet context={{ setCartCount }} />
      <WhatsAppButton />
    </section>
  );
};

export default ShopHome;
