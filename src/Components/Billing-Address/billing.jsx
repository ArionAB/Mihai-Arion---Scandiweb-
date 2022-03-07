import React, { Component } from "react";
import { history } from "../history";
import { addBilling } from "../firebase";
import { connect } from "react-redux";

import "./billing.styles.scss";
import ProgressBar from "../progress-bar/progress-bar";

class Billing extends Component {
  constructor() {
    super();
    this.state = {
      progressBar: false,
      content: {
        fName: "",
        lName: "",
        street: "",
        address: "",
        zip: "",
        city: "",
        county: "",
      },
      errors: {
        fName: "",
        lName: "",
        street: "",
        address: "",
        zip: "",
        city: "",
        county: "",
      },
    };
  }

  componentDidMount() {
    this.setState({ progressBar: true });
  }

  handleSendBilling() {
    const { content } = this.state;
    const { user } = this.props;
    addBilling(
      content.fName,
      content.lName,
      content.street,
      content.address,
      content.zip,
      content.city,
      content.county,
      user.uid
    );
  }

  handleChange = (e) => {
    const { content, errors } = this.state;
    const { value, name } = e.target;
    this.setState({ content: { ...content, [name]: value } });

    const newErrors = { ...errors };
    newErrors[name] = "";

    this.setState({ errors: newErrors });
  };

  handleSubmit = (e) => {
    const { content, errors } = this.state;
    e.preventDefault();

    let hasErrors = false;
    let newErrors = { ...errors };

    if (!content.fName) {
      hasErrors = true;
      newErrors.fName = "Please add your first name";
    }
    if (!content.lName) {
      hasErrors = true;
      newErrors.lName = "Please add your last name";
    }
    if (!content.street) {
      hasErrors = true;
      newErrors.street = "Please add your street";
    }
    if (!content.address) {
      hasErrors = true;
      newErrors.address = "Please add your address";
    }
    if (!content.zip) {
      hasErrors = true;
      newErrors.zip = "Please add your zip code";
    }
    if (!content.city) {
      hasErrors = true;
      newErrors.city = "Please add your city";
    }
    if (!content.county) {
      hasErrors = true;
      newErrors.county = "Please add your county";
    }

    if (hasErrors) {
      this.setState({ errors: newErrors });
      return;
    }
    this.handleSendBilling();

    history.push("/confirmation");
  };
  render() {
    const { content, errors, progressBar } = this.state;
    return (
      <>
        <ProgressBar billing={progressBar} />
        <div className="billing">
          <form className="sign-in-form" onSubmit={this.handleSubmit}>
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
      </>
    );
  }
}

const mapStateToProps = ({ user: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(Billing);
