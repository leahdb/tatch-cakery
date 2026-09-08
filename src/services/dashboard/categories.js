import API_BASE from "../apiBase";

const API_HOST = `${API_BASE}/dash/dash-categories`;

export const fetch_categories = () => {
  return fetch(API_HOST, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const reorder_categories = (ids) => {
  return fetch(`${API_HOST}/reorder`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  }).then((res) => res.json());
};
