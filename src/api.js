export const API_HOST = "http://localhost:8080"; //"api";
export const REGISTRATION_ENDPOINT = "/register";
export const LOGIN_ENDPOINT = "/login";
export const PROFILE_INFO = "/profile";

export default class ApiClient {
  constructor({ apiErrorHandler }) {
    this.defaultApiErrorHandler = apiErrorHandler;
  }

  login = (loginInfo, customErrorHandler) => {
    const loginParams = new URLSearchParams();
    loginParams.append("username", loginInfo.username);
    loginParams.append("password", loginInfo.password);

    return this.makePost(
      LOGIN_ENDPOINT,
      loginParams.toString(),
      new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
      customErrorHandler
    );
  };

  updateProfile = profileData =>
    this.makePost(PROFILE_INFO, JSON.stringify(profileData));

  makePost = (
    url = "",
    data = {},
    headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    customErrorHandler
  ) =>
    fetch(`${API_HOST}${url}`, {
      method: "POST",
      mode: "cors",
      headers,
      credentials: "include",
      body: data
    })
      .then(response => {
        if (!response.ok) {
          (customErrorHandler && !customErrorHandler(response)) ||
            this.defaultApiErrorHandler(response);
          return;
        }
        return response.json();
      })
      .catch(error => {
        if (error === "error") {
          console.log("EEEEEEEEEEEEEEEEEEEE");
        }
      });

  makeGet = (url = "") =>
    fetch(`${API_HOST}${url}`, {
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      credentials: "include",
      mode: "cors"
    }).then(response => {
      if (!response.ok) {
        this.defaultApiErrorHandler(response);
      }
      return response.json();
    });
}
