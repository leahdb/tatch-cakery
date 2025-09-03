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

export const update_cart = (product_id, quantity) => {
  return fetch(API_HOST + "update", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id, quantity }),
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

export const checkout = (payload) => {
  return fetch(API_HOST + "checkout", {
    method: "POST",
    credentials: "include",
    redirect: 'manual',
    headers: { 
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const apply_coupon = ({ code, city }) => {
  return fetch(API_HOST + "apply-coupon", {
    method: "POST",
    credentials: "include",
    redirect: 'manual',
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code, city }),
  }).then((res) => res.json());
};

export const remove_coupon = async () => {
  return fetch(API_HOST + "coupon", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};