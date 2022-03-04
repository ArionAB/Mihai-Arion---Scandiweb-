import React, { Component } from "react";
import { register, addData, register2 } from "../firebase";
import { history } from "../history";
import { connect } from "react-redux";

import "./sign-up.styles.scss";

class SignUp extends Component {
  state = {
    active: false,

    content: {
      email: "",
      password: "",
      confirm: "",
    },
    errors: {
      email: "",
      password: "",
      confirm: "",
      checkbox: "",
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
    const { content, errors, active } = this.state;
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

    if (content.password !== content.confirm) {
      hasErrors = true;
      newErrors.confirm = "Passwords don't match";
    }

    if (!active) {
      hasErrors = true;
      newErrors.checkbox = "Please accept Terms of Use";
    }

    if (hasErrors) {
      this.setState({ errors: newErrors });
      return;
    }
    this.handleSignUp();
  };

  handleSignUp() {
    const { content } = this.state;
    const date = new Date();
    register(content.email, content.password, date);
    history.push("/");
  }

  render() {
    const { active, content, errors } = this.state;

    return (
      <div>
        <form className="sign-in-form" onSubmit={this.handleSubmit}>
          <div className="triangle-bottomright"></div>
          <div className="test">
            <h1>You don't have an account? Sign up</h1>
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
                  type="password"
                  name="password"
                  className={errors.password ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.password}
                ></input>
                <div className="error">{errors.password}</div>
              </label>
            </div>
            <div>
              <label className="labels">
                Confirm Password
                <input
                  type="password"
                  name="confirm"
                  className={errors.confirm ? "hasErrors" : "input"}
                  onChange={this.handleChange}
                  value={content.confirm}
                ></input>
                <div className="error">{errors.confirm}</div>
              </label>
            </div>
            {active ? "" : <div className="error">{errors.checkbox}</div>}

            <div className="tos">
              <button
                onChange={this.handleChange}
                type="button"
                onClick={() => this.setState({ active: !active })}
                className="accepted"
              >
                {active ? <span> &#10003;</span> : ""}
              </button>
              <p>I accept the Terms of Use & Privacy Policy.</p>
            </div>
            <div className="buttons">
              <button disabled={this.state.loading} type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(SignUp);
