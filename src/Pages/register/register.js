import React, { Component } from "react";
import SignIn from "../../Components/SignIn/sign-in";
import SignUp from "../../Components/SignUp/sign-up";

import "./register.styles.scss";

export default class Register extends Component {
  render() {
    return (
      <div className="register">
        <SignIn />
        <SignUp />
      </div>
    );
  }
}
