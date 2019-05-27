import React from "react";




export const ApplicationContext = React.createContext();

export const ApplicationStateProvider = ({ value, children }) => (
  <ApplicationContext.Provider value={value}>
    {children}
  </ApplicationContext.Provider>
);
