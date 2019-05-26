import React from "react";

export const ApplicationContext = React.createContext({ hello: "blia" });

const state = {
  userId: undefined,
  shouldShowSpinner: false,

  updateUserId: userId => {
    state.userId = userId;
    if (localStorage) {
      localStorage.setItem("userId", userId);
    }
  },
  showSpinner: () => {
    state.shouldShowSpinner = true;
  },
  hideSpinner: () => {
    state.shouldShowSpinner = false;
  },
  getUserId: () => {
    if (state.userId) {
      return state.userId;
    }
    if (localStorage && localStorage.getItem("userId")) {
      return localStorage.getItem("userId");
    }
    throw "user id not defined";
  }
};

export const ApplicationStateProvider = ({ children }) => (
  <ApplicationContext.Provider value={state}>
    {children}
  </ApplicationContext.Provider>
);
