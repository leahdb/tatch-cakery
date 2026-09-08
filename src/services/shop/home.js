import API_BASE from "../apiBase";

const API_HOST = `${API_BASE}/shop-home/`;

export const fetch_shop_home = () => {
  return fetch(API_HOST, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
