export const API_HOST = "http://localhost:8080"; //"api";
export const REGISTRATION_ENDPOINT = "/register";
export const LOGIN_ENDPOINT = "/login";
export const PROFILE_INFO = "/profile";

export default class ApiClient {
  constructor({ apiErrorHandler }) {
    this.defaultApiErrorHandler = apiErrorHandler;
  }

  login = loginInfo => {
    const loginParams = new URLSearchParams();
    loginParams.append("username", loginInfo.username);
    loginParams.append("password", loginInfo.password);

    return new ApiRequest(
      this.makePost(
        LOGIN_ENDPOINT,
        loginParams.toString(),
        new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      )
    );
  };

  updateProfile = profileData =>
    this.makePost(PROFILE_INFO, JSON.stringify(profileData));

  registration = registrationData =>
    new ApiRequest(
      this.makePost(REGISTRATION_ENDPOINT, JSON.stringify(registrationData)),
      this.defaultApiErrorHandler
    );

  makePost = (
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

export class ApiRequest {
  constructor(fetch, defaultApiErrorHandler) {
    this.fetch = fetch;
    this.defaultApiErrorHandler = defaultApiErrorHandler;
  }

  ifBadRequest = badRequestHandler => {
    this.onBadRequestHandler = badRequestHandler;
    return this;
  };

  ifWrongCredentials = wrongCredentialsHandler => {
    this.wrongCredentialsHandler = wrongCredentialsHandler;
    return this;
  };

  ifSuccess = successHandler => {
    this.successHandler = successHandler;
    return this;
  };

  execute = () => {
    return this.fetch
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw { status: response.status, response };
      })
      .then(this.successHandler)
      .catch(async e => {
        console.log(e);
        if (e.status) {
          switch (e.status) {
            case 400:
              const jsonResponse = await e.response.json();
              if (!this.onBadRequestHandler(jsonResponse)) {
                return;
              }
              break;
            case 401:
              if (!this.wrongCredentialsHandler()) {
                return;
              }
          }
        }
        this.defaultApiErrorHandler(e);
      });
  };
}
