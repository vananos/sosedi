import React from "react";
import NotificationManager from "./NotificationManager";
import { shallow } from "enzyme";

const notificationContent = <span>notification content</span>;

describe("NotificationManager, ", () => {
  let notificationManagerWrapper;

  beforeEach(() => {
    notificationManagerWrapper = shallow(<NotificationManager />);
  });

  it("when notify is called -> notification should appear", () => {
    NotificationManager.notify(notificationContent);

    expect(notificationManagerWrapper).toMatchSnapshot();
  });

  it("when notification lifetime is over -> notification should be removed", async () => {
    NotificationManager.notify(notificationContent, { duration: 500 });
    await delay(600);
    expect(notificationManagerWrapper).toMatchSnapshot();
  });
});

const delay = async duration => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve("done"), duration)
  );
};
