import config from "./config.js";
export const API_GATEWAY = config.apiGateway;
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
        "/login",
        loginParams.toString(),
        new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      ),
      this.defaultApiErrorHandler
    );
  };

  registration = registrationData =>
    new ApiRequest(
      this.makePost(
        "/register",
        JSON.stringify(registrationData),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  loadAvatar = formData =>
    new ApiRequest(
      this.makePost("/avatar", formData),
      this.defaultApiErrorHandler
    );

  getUserAd = userId =>
    new ApiRequest(
      this.makeGet(`/ad?userid=${userId}`),
      this.defaultApiErrorHandler
    );

  updateUserAd = userAdUpdateRequest =>
    new ApiRequest(
      this.makePost(
        "/ad",
        JSON.stringify(userAdUpdateRequest),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  getProfileInfo = userId =>
    new ApiRequest(
      this.makeGet(`${PROFILE_INFO}?userid=${userId}`),
      this.defaultApiErrorHandler
    );

  updateProfileInfo = profileInfo =>
    new ApiRequest(
      this.makePost(
        PROFILE_INFO,
        JSON.stringify(profileInfo),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  sendFeedback = feedbackData =>
    new ApiRequest(
      this.makePost(
        "/feedback",
        JSON.stringify(feedbackData),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  getMatches = userId =>
    new ApiRequest(
      this.makeGet(`/matches?userid=${userId}`),
      this.defaultApiErrorHandler
    );

  updateMatch = matchUpdateRequest =>
    new ApiRequest(
      this.makePost(
        "/match",
        JSON.stringify(matchUpdateRequest),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  requestPasswordReset = email => {
    const reqParams = new URLSearchParams();
    reqParams.append("email", email);
    return new ApiRequest(
      this.makePost(
        "/requestreset",
        reqParams.toString(),
        new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      ),
      this.defaultApiErrorHandler
    );
  };

  resetPassword = passwordResetRequest =>
    new ApiRequest(
      this.makePost(
        "/resetpassword",
        JSON.stringify(passwordResetRequest),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  changePassword = changePasswordRequest =>
    new ApiRequest(
      this.makePost(
        "/settings/password",
        JSON.stringify(changePasswordRequest),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  updateNotificationSettings = notificationSettingsUpdateRequest =>
    new ApiRequest(
      this.makePost(
        "/settings/notifications",
        JSON.stringify(notificationSettingsUpdateRequest),
        new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      ),
      this.defaultApiErrorHandler
    );

  getSettings = userId =>
    new ApiRequest(
      this.makeGet(`/settings?userid=${userId}`),
      this.defaultApiErrorHandler
    );

  deleteAccount = userId =>
    new ApiRequest(
      this.makePost(`/settings/deleteaccount?userid=${userId}`),
      this.defaultApiErrorHandler
    );

  deleteAvatar = userId =>
    new ApiRequest(
      this.makeDelete(`/avatar?userid=${userId}`),
      this.defaultApiErrorHandler
    );

  getMutualMatches = userId =>
    new ApiRequest(
      this.makeGet(`/mutualmatches?userid=${userId}`),
      this.defaultApiErrorHandler
    );

  makeDelete = (url = "") =>
    fetch(`${API_GATEWAY}${url}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    });

  makePost = (url = "", data, headers) =>
    fetch(`${API_GATEWAY}${url}`, {
      method: "POST",
      mode: "cors",
      headers,
      credentials: "include",
      body: data
    });

  makeGet = (url = "") =>
    fetch(`${API_GATEWAY}${url}`, {
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      credentials: "include",
      mode: "cors"
    });
}

export class ApiRequest {
  onBadRequestHandler = _ => true;
  wrongCredentialsHandler = _ => true;
  successHandler = _ => true;
  notFoundHandler = _ => true;

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

  ifNotFound = notFoundHandler => {
    this.notFoundHandler = notFoundHandler;
    return this;
  };

  execute = () => {
    return this.fetch
      .then(response => {
        if (response.ok) {
          if (isJsonResponse(response)) {
            return response.json();
          }
          return response;
        }
        throw { status: response.status, response };
      })
      .then(this.successHandler)
      .catch(async e => {
        if (e.status) {
          switch (e.status) {
            case 400:
              if (isJsonResponse(e.response)) {
                const jsonResponse = await e.response.json();
                if (!this.onBadRequestHandler(jsonResponse)) {
                  return;
                }
              }
              break;
            case 401:
              if (!this.wrongCredentialsHandler()) {
                return;
              }
              break;
            case 404:
              if (!this.notFoundHandler()) {
                return;
              }
          }
        }
        this.defaultApiErrorHandler(e);
      });
  };
}

const isJsonResponse = response => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
};
