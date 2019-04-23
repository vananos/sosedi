import React, { Component } from "react";
import CreateNeighborAd from "./CreateNeighborAd";
import CreateTenantAd from "./CreateTenantAd";
import Button from "../common/Button";
import "./CreateAd.css";

export default class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab || "neighbor"
    };
  }

  render() {
    const isNeighbor = this.state.activeTab === "neighbor";
    return (
      <div className="create-ad">
        <div >
          <div className="create-ad-header">
            <div className="create-ad-toggler">
              <Button color={`${isNeighbor ? "btn-yellow" : ""}`}>
                Снимаю
              </Button>
              <Button color={`${!isNeighbor ? "btn-yellow" : ""}`}>Сдаю</Button>
            </div>
          </div>
        </div>
        {this.state.activeTab === "neighbor" ? (
          <CreateNeighborAd />
        ) : (
          <CreateTenantAd />
        )}
      </div>
    );
  }
}
