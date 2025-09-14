import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendPageview } from "./analytics/ga";

export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    sendPageview(path);
  }, [location]);

  return null;
}