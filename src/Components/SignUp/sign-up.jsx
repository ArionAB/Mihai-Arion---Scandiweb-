import React, { Component } from "react";

import "./sign-up.styles.scss";

export default class SignUp extends Component {
  state = {
    active: false,
  };
  render() {
    const { active } = this.state;
    return (
      <div>
        <form className="sign-in-form">
          <div className="triangle-bottomright"></div>
          <div className="test">
            <h1>You don't have an account? Sign up</h1>
            <div>
              <label className="labels">
                Email address
                <input type="email" placeholder="example@company.com"></input>
              </label>
            </div>
            <div>
              <label className="labels">
                Password
                <input type="password"></input>
              </label>
            </div>
            <div>
              <label className="labels">
                Confirm Password
                <input type="password"></input>
              </label>
            </div>
            <div className="tos">
              <button
                type="button"
                onClick={() => this.setState({ active: !active })}
                className={active ? "accepted" : "accept"}
              >
                &#10003;
              </button>
              <p>I accept the Terms of Use & Privacy Policy.</p>
            </div>
            <div className="buttons">
              <button type="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
