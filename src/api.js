export const API_HOST = "http://localhost:8080"; //"api";
export const REGISTRATION_ENDPOINT = "/register";
export const LOGIN_ENDPOINT = "/login";
export const PROFILE_INFO = "/profile";

export const makePost = (
  url = "",
  data = {},
  headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  }),
  unAuthorizedHandler = handleUnauthorized
) =>
  fetch(`${API_HOST}${url}`, {
    method: "POST",
    mode: "cors",
    headers,
    credentials: "include",
    body: data
  }).then(response => {
    if (response.status === 401) {
      unAuthorizedHandler();
      throw 'unauthorized';
    }
    return response.json();
  });

export const makeGet = (url = "") =>
  fetch(`${API_HOST}${url}`, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    credentials: "include",
    mode: "cors"
  }).then(response => {
    if (response.status === 401) {
      handleUnauthorized();
    }
    return response.json();
  });

const handleUnauthorized = () => {
  console.log("ups ups ups");
  throw "unauthorized!";
};
