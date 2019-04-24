import React, { Component } from 'react'
import "../Thumbler.css";
export default class Thumbler extends Component {
  render() {
    const {value1, value2, name} = props;
    return (
      <div>
        <input type="radio" value={value1} name={name}>       
        <input type="radio" value={value2} name={name}>       
      </div>
    )
  }
}
