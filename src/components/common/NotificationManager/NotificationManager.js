import React, { Component } from "react";
import Notification from "../Notification/Notification";
import "./NotificationManager.scss";

export default class NotificationManager extends Component {
  static notificationIdCounter = 0;

  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
    NotificationManager._singletonRef = this;
  }

  static notify = (msg, { duration = 3000, type = "success" } = {}) => {
    const notificationData = {
      type,
      msg,
      key: NotificationManager.notificationIdCounter++
    };

    const hideFunction = () =>
      NotificationManager._singletonRef.deleteNotification(notificationData);
    notificationData.onClick = hideFunction;

    NotificationManager._singletonRef.addNotification(notificationData);

    setInterval(hideFunction, duration);
  };

  addNotification = notifcation =>
    this.setState({
      notifications: [...this.state.notifications, notifcation]
    });

  deleteNotification = notifcationForDelete => {
    const filteredNotifications = this.state.notifications.filter(
      notifcation => notifcation !== notifcationForDelete
    );
    this.setState({ notifications: filteredNotifications });
  };

  render() {
    return (
      <div className="notification-area">
        {this.state.notifications.map(notifcation => (
          <Notification {...notifcation} />
        ))}
      </div>
    );
  }
}
