import React, { Component } from "react";
import CreateLandlordAd from "../CreateLandlordAd/CreateLandlordAd";
import Button from "../../common/Button/Button";
import "./CreateAd.scss";
import CreateRenterAd from "../CreateRenterAd/CreateRenterAd";

export default class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab || "renter"
    };
  }

  render() {
    const isLandlordAd = this.state.activeTab === "landlord";
    return (
      <div className="ad">
        <div>
          <div className="ad-header">
            <div className="ad-toggler">
              <Button
                color={isLandlordAd ? "disabled" : "yellow"}
                onClick={_ => this.setState({ activeTab: "renter" })}
              >
                Снимаю
              </Button>
              <Button
                color={isLandlordAd ? "yellow" : "disabled"}
                onClick={_ => this.setState({ activeTab: "landlord" })}
              >
                Сдаю
              </Button>
            </div>
          </div>
          <hr />
          {isLandlordAd ? <CreateLandlordAd /> : <CreateRenterAd />}
        </div>
      </div>
    );
  }
}
