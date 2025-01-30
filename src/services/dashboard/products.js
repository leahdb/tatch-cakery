const API_HOST = "https://api.tatchcakery.com/api/dash/dash-products";
const EXPORT_API = "https://api.tatchcakery.com/api/dash/export/products";
const SEARCH_API = "https://api.tatchcakery.com/api/dash/search/top";

export const IMPORT_API = API_HOST + "import";

export const fetch_shop_products = (options) => {
  const encodedQueryParams = new URLSearchParams(options);

  return fetch(`${API_HOST}?${encodedQueryParams}`, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
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

export const export_shop_products = () => {
  return fetch(EXPORT_API, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const add_shop_products = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("image", data.image);
  return fetch(API_HOST, {
    method: "POST",
    credentials: "include",
    secure: true,
    body: formData,
    headers: {},
  }).then((res) => res.json());
};

export const edit_shop_products = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }
  return fetch(`${API_HOST}${id}?_method=PUT`, {
    method: "POST",
    credentials: "include",
    secure: true,
    body: formData,
    headers: {},
  }).then((res) => res.json());
};

export const delete_shop_products = (ids) => {
  let idCsv = ids.join(",");
  return fetch(`${API_HOST}${idCsv}`, {
    method: "DELETE",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const search_shop_products = (searchQuery) => {
  return fetch(`${SEARCH_API}?query=${searchQuery}&type=product`, {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const fetch_product_create_form = () => {
  return fetch(API_HOST + "create", {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const fetch_product_edit_form = (id) => {
  return fetch(API_HOST + id + "/edit", {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
