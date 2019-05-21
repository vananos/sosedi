import React, { Component } from "react";

const ApplicationContext = React.createContext();

class ApplicationContextProvider extends Component {
  showSpinner = () => {
    this.setState({
      spinnerDisplayed: true
    });
  };

  hideSpinner = () => {
    this.setState({
      spinnerDisplayed: false
    });
  };

  render() {
    return (
      <ApplicationContext.Provider
        value={{
          ...this.state,
          hideSpinner: this.hideSpinner,
          showSpinner: this.showSpinner
        }}
      >
        {this.props.children}
      </ApplicationContext.Provider>
    );
  }
}

const ApplicationContextConsumer = ApplicationContext.Consumer;

export { ApplicationContextProvider, ApplicationContextConsumer };
