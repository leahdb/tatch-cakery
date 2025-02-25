const API_HOST = "https://api.tatchcakery.com/api/cart/";

export const add_to_cart = (data) => {
  return fetch(API_HOST, {
    method: "POST",
    credentials: "include",
    secure: true,
    body: data,
    headers: {},
  }).then((res) => res.json());
};

export const fetch_shop_product = (id) => {
  return fetch(API_HOST + id, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

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