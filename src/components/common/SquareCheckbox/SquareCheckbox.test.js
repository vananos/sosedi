import { shallow } from "enzyme";
import React from "react";
import SquareCheckbox from "./SquareCheckbox";

describe("Checkbox", () => {
  const checkboxProps = () => ({
    name: "test-checkbox",
    value: "test?"
  });

  it("checkbox is not checked, click -> checked", () => {
    const checkboxWrapper = shallow(<SquareCheckbox {...checkboxProps()} />);
    checkboxWrapper
      .find("div")
      .first()
      .simulate("click");

    expect(checkboxWrapper).toMatchSnapshot();
  });

  it("checkbox is checked, click -> not checked", () => {
    const checkboxWrapper = shallow(
      <SquareCheckbox {...checkboxProps()} checked={true} />
    );
    
    checkboxWrapper
      .find("div")
      .first()
      .simulate("click");

    expect(checkboxWrapper).toMatchSnapshot();
  });
});
