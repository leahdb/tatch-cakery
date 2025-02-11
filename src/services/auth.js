const API_HOST = "https://api.tatchcakery.com/api/auth/";

export function authenticate(email, password) {
  return fetch(API_HOST + "login", {
    method: "POST",
    mode: "no-cors",
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
      localStorage.setItem("user_logged_in", "true");
      return response;
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}

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
      console.log(res)
      if (res.status === "ok") {
        console.log("df")
        localStorage.clear();
        localStorage.setItem("user_logged_in", "false");
      }
      return res;
    })
    .catch((error) => {
      console.error("Error during logout:", error);
      return { status: "error" }; 
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

      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

