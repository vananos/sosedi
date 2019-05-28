import { shallow } from "enzyme";
import React from "react";
import Thumbler from "./Thumbler";

describe("Thumbler, ", () => {
  let thumblerWrapper;

  beforeEach(() => {
    thumblerWrapper = shallow(
      <Thumbler>
        <span>Like?</span>
      </Thumbler>
    );
  });

  it("default state", () => {
    expect(thumblerWrapper).toMatchSnapshot();
  });

  it("click on yes -> thumbler should be in `yes` state", () => {
    thumblerWrapper
      .find(".yes-btn")
      .first()
      .simulate("click", { stopPropagation() {} });

    expect(thumblerWrapper).toMatchSnapshot();
  });

  it("click on no -> thumbler should be in `no` state", () => {
    thumblerWrapper
      .find(".no-btn")
      .first()
      .simulate("click", { stopPropagation() {} });

    expect(thumblerWrapper).toMatchSnapshot();
  });
});
