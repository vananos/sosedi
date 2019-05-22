export const API_HOST = process.env.REACT_APP_API_HOST;
export const REGISTRATION_ENDPOINT = "/register";
export const LOGIN_ENDPOINT = "/login";

export const makePost = (
  url = "",
  data = {},
  headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  })
) =>
  fetch(`${API_HOST}${url}`, {
    method: "POST",
    mode: "cors",
    headers,
    credentials: "include",
    body: data
  });
