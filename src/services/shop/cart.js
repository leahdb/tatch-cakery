const API_HOST = "https://api.tatchcakery.com/api/cart/";

export const add_to_cart = (data) => {
  return fetch(API_HOST + "add", {
    method: "POST",
    credentials: "include",
    secure: true,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const fetch_cart = () => {
  return fetch(API_HOST, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const remove_from_cart = (product_id) => {
  return fetch(API_HOST + "remove", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id }),
  }).then((res) => res.json());
};

export const checkout = (payload) =>
  fetch(API_HOST + "checkout", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

// export const fetch_shop_product = (id) => {
//   return fetch(API_HOST + id, {
//     method: "GET",
//     credentials: "include",
//     secure: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());
// };

// export const search_shop_products = (searchQuery) => {
//   return fetch(`${SEARCH_API}?query=${searchQuery}&type=product`, {
//     method: "GET",
//     credentials: "include",
//     secure: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());
// };