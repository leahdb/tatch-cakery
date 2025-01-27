const API_HOST = process.env.REACT_APP_DASHBOARD_API_URL + "/api/dash/shop/orders/";

export const fetch_shop_orders = (options) => {

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

export const fetch_shop_order = (id) => {
    return fetch(API_HOST + id, {
        method: 'GET',
        credentials: 'include',
        secure: true,
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

export const edit_shop_orders = (id, data) => {
    return fetch(`${API_HOST}edit/${id}`, {
        method: 'POST',
        credentials: 'include',
        secure: true,
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

export const delete_shop_orders = (ids) => {
    let idCsv = ids.join(",")
    return fetch(`${API_HOST}delete/${idCsv}`, {
        method: 'POST',
        credentials: 'include',
        secure: true,
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

export const accept_order = (orderId) => {
  return fetch(`${API_HOST}${orderId}/accept`, {
    method: "PUT",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const refuse_order = (orderId) => {
  return fetch(`${API_HOST}${orderId}/refuse`, {
    method: "PUT",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// export const remove_product = (orderId, productId) => {
//   return fetch(`${API_HOST}${orderId}/products/${productId}`, {
//     method: "DELETE",
//     credentials: "include",
//     secure: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());
// };


export const set_delivery_option = (orderId, deliveryOption) => {
  return fetch(`${API_HOST}${orderId}/set-delivery-option/${deliveryOption}`, {
    method: "PUT",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const update_product_quantity = (orderId, quantities) => {
  return fetch(`${API_HOST}${orderId}/update-quantity`, {
    method: "PUT",
    credentials: "include",
    secure: true,
    body: JSON.stringify({ quantities }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
