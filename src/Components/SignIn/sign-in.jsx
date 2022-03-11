import React, { Component } from "react";
import { google } from "../firebase";
import { history } from "../history";
import { login } from "../firebase";

import "./sign-in.styles.scss";

class SignIn extends Component {
  state = {
    content: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  };

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

    if (!content.email) {
      hasErrors = true;
      newErrors.email = "Please add your email address";
    }

    if (content.email && !content.email.includes("@")) {
      hasErrors = true;
      newErrors.email = "Email address must contain '@'";
    }
    if (
      content.email &&
      content.email.includes("@") &&
      !content.email.includes(".")
    ) {
      hasErrors = true;
      newErrors.email = "Email address must contain '.'";
    }

    if (!content.password) {
      hasErrors = true;
      newErrors.password = "Please add a password";
    }

    if (content.password && content.password.length < 6) {
      hasErrors = true;
      newErrors.password = "Password must be at least 6 characters";
    }

    if (hasErrors) {
      this.setState({ errors: newErrors });
      return;
    }
    this.handleLogin();
  };

  handleLogin() {
    const { content } = this.state;
    login(content.email, content.password);
    history.push("/");
  }

  render() {
    const { content, errors } = this.state;

    return (
      <>
        <form className="sign-in-form" onSubmit={this.handleSubmit} noValidate>
          <div className="triangle-bottomleft"></div>
          <div className="test">
            <h1>Already have an account? Sign in</h1>
            <div>
              <label className="labels">
                Email address
                <input
                  className={errors.email ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.email}
                  type="email"
                  name="email"
                  placeholder="example@company.com"
                ></input>
                <div className="error">{errors.email}</div>
              </label>
            </div>
            <div>
              <label className="labels">
                Password
                <input
                  className={errors.password ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.password}
                  type="password"
                  name="password"
                ></input>
                <div className="error">{errors.password}</div>
              </label>
            </div>

            <div className="buttons">
              <button type="submit">Sign In</button>
              <button type="button" className="google" onClick={google}>
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default SignIn;
