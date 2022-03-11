import React, { Component } from "react";
import CategoryName from "../../Components/Category/CategoryName";
import SelectCurrency from "../../Components/selectCurrency/SelectCurrency";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Menu } from "../../Assets/hamburger-menu-svgrepo-com.svg";
import Logo from "../../Assets/shopping-bag-svgrepo-com.svg";

import "./nav.styles.scss";
import CartDropdown from "../Cart-dropdown/cart-dropdown";
class Nav extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  render() {
    const { hidden } = this.props;

    return (
      <>
        <div className="top-nav">
          <p>
            We're open and available for shipping nation wide.{" "}
            <Link to="/category/all">
              <span>Order Now</span>
            </Link>
          </p>
        </div>
        <div className="nav ">
          <CategoryName />
          <Link to="/">
            <img src={Logo} className="logo" alt="Logo"></img>
          </Link>

          <SelectCurrency />
          {hidden ? null : <CartDropdown />}
        </div>
        <div className="ham-nav">
          <Menu
            className={this.state.show ? "menu-fill" : "menu"}
            onClick={() => this.setState({ show: !this.state.show })}
          />
          <Link to="/">
            <img src={Logo} className="logo" alt="Logo"></img>
          </Link>
          <SelectCurrency className="nav-currency" />
          {this.state.show ? (
            <div className="content">
              <CategoryName className="category" />
              <SelectCurrency className="currency" />
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ cart: { hidden } }) => ({
  hidden,
});

export default connect(mapStateToProps)(Nav);
