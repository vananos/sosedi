export const API_HOST = process.env.REACT_APP_API_HOST;
export const REGISTRATION_ENDPOINT = "/register";

export const makePost = (url = "", data = {}) =>
  fetch(`${API_HOST}${url}`, {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(data)
  });
