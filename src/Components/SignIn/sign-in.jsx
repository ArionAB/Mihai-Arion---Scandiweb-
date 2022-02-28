import React, { Component } from "react";
import "./sign-in.styles.scss";

class SignIn extends Component {
  render() {
    return (
      <div>
        <form className="sign-in-form">
          <div className="triangle-bottomleft"></div>
          <div className="test">
            <h1>Already have an account? Sign in</h1>
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

            <div className="buttons">
              <button type="submit">Sign In</button>
              <button type="button" className="google">
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
