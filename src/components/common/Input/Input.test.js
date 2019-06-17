import React from "react";
import Input from "./Input";
import { render, mount } from "enzyme";

describe("Input, ", () => {
  const defaultInputProps = () => ({
    value: "",
    name: "testInput",
    id: "testInputId",
    type: "text",
    label: "test text",
    className: "customClass"
  });

  it("when value is empty -> label is on bottom", () => {
    const inputWrapper = render(<Input {...defaultInputProps()} />);

    expect(inputWrapper).toMatchSnapshot();
  });

  it("when value provided -> label is on top", () => {
    const inputProps = defaultInputProps();
    inputProps.value = "value is provided";
    const inputWrapper = render(<Input {...inputProps} />);

    expect(inputWrapper).toMatchSnapshot();
  });

  it("when focused -> label is on top", () => {
    const inputWrapper = mount(<Input {...defaultInputProps()} />);
    inputWrapper
      .find("input")
      .first()
      .simulate("focus");

    expect(inputWrapper).toMatchSnapshot();
  });

  it("when error is provideed -> should see error message", () => {
    const error = {
      error: "it's definitely wrong",
      value: "wrong value"
    };
    const inputProps = defaultInputProps();
    inputProps.error = error;

    const inputWrapper = render(<Input {...inputProps} />);

    expect(inputWrapper).toMatchSnapshot();
  });
});
