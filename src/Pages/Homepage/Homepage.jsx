import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../Homepage/Homepage.styles.scss";

class Homepage extends Component {
  render() {
    return (
      <div className="HP-container">
        <div className="order">
          <div className="left">
            <h1>
              High quality clothes & tech, <span>delivered</span> to your door.
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
            <Link to="/category/all">
              <button>Place an Order</button>
            </Link>
            <div className="trustpilot">
              <p className="asd">Trustpilot</p>
              <p>
                <span className="numbers">4.8 out of 5</span> based on 2000+
                reviews
              </p>
            </div>
          </div>
          <div className="right">
            <div className="background"></div>
            <img src={require("../../Assets/RockPS.png")} alt="Rock" />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
