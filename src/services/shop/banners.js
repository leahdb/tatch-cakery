const API_HOST = "http://127.0.0.1:8000/api/banners";

export const fetch_banners = () => {
  return fetch(API_HOST, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
