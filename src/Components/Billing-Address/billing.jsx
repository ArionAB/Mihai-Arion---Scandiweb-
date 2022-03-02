import React, { Component } from "react";

import "./billing.styles.scss";

export default class Billing extends Component {
  constructor() {
    super();
    this.state = {
      content: {
        fName: "",
        lName: "",
        street: "",
        address: "",
        zip: "",
        city: "",
        country: "",
      },
      errors: {
        fName: "",
        lName: "",
        street: "",
        address: "",
        zip: "",
        city: "",
        country: "",
      },
    };
  }
  render() {
    const { content, errors } = this.state;
    return (
      <div className="billing">
        <form className="sign-in-form">
          <div className="triangle-bottomright"></div>
          <div className="test">
            <h1>Billing Address</h1>
            <div className="first-last">
              <label className="labels">
                First Name
                <input
                  className={errors.fName ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.fName}
                  type="text"
                  name="fName"
                  placeholder="John"
                ></input>
                <div className="error">{errors.fName}</div>
              </label>
              <label className="labels">
                Last Name
                <input
                  className={errors.lName ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.lName}
                  type="text"
                  name="lName"
                  placeholder="Deer"
                ></input>
                <div className="error">{errors.lName}</div>
              </label>
            </div>
            <div>
              <label className="labels">
                Street Name
                <input
                  className={errors.street ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.street}
                  type="text"
                  name="street"
                  placeholder="5th Avenue"
                ></input>
                <div className="error">{errors.street}</div>
              </label>
            </div>
            <div>
              <label className="labels">
                Additional address info
                <input
                  className={errors.address ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.address}
                  type="text"
                  name="address"
                  placeholder="Block, apartment, etc"
                ></input>
                <div className="error">{errors.address}</div>
              </label>
            </div>
            <div className="first-last">
              <label className="labels">
                Zip Code
                <input
                  className={errors.zip ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.zip}
                  type="text"
                  name="zip"
                  placeholder="510072"
                ></input>
                <div className="error">{errors.zip}</div>
              </label>
              <label className="labels">
                City
                <input
                  className={errors.city ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.city}
                  type="text"
                  name="city"
                  placeholder="Bucharest"
                ></input>
                <div className="error">{errors.city}</div>
              </label>
            </div>
            <div>
              <label className="labels">
                County
                <input
                  className={errors.county ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.county}
                  type="text"
                  name="county"
                  placeholder="County"
                ></input>
                <div className="error">{errors.county}</div>
              </label>
            </div>

            <div className="buttons">
              <button type="submit">Payment Method</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
