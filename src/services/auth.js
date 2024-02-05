const API_HOST = "http://127.0.0.1:8000/api/auth/";

export function authenticate(email, password) {
  return fetch(API_HOST + "login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.status === "error") {
        return response;
      }

      return fetch_authed_user();
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}

const fetch_authed_user = () => {
  return fetch(API_HOST + "user", {
    method: "GET",
    credentials: "include",
    secure: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "ok") {
        localStorage.setItem("user_logged_in", "true");
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("user_first_name", res.data.user.first_name);
        localStorage.setItem("user_last_name", res.data.user.last_name);
        localStorage.setItem("user_menus", JSON.stringify(res.data.menus));
        localStorage.setItem("user_role", res.data.role);
      }

      return res;
    });
};

export const unauthenticate = () => {
  return fetch(API_HOST + "logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "ok") {
        localStorage.clear();
        localStorage.setItem("user_logged_in", "false");
      }

      return res;
    });
};

export function saveRegistrationData(data) {

  return fetch(API_HOST + "register", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.status === "error") {
        return response;
      }

      return fetch_authed_user();
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}

