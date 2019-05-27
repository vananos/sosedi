import React, { Component } from "react";
import Notification from "../Notification/Notification";
import "./NotificationManager.scss";

export default class NotificationManager extends Component {
  static notificationIdCounter = Number.MAX_SAFE_INTEGER;

  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
    NotificationManager._singletonRef = this;
  }

  static notify = (msg, { duration = 3000, type = "success" }) => {
    const notificationData = {
      type,
      msg,
      key: NotificationManager.notificationIdCounter--
    };

    const callback = () =>
      NotificationManager._singletonRef.deleteNotification(notificationData);
    notificationData.callback = callback;

    NotificationManager._singletonRef.addNotification(notificationData);

    setInterval(callback, duration);
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
          <Notification {...notifcation} key={notifcation.key} />
        ))}
      </div>
    );
  }
}
