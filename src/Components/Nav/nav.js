import React, { Component } from "react";
import CategoryName from "../../Components/Category/CategoryName";
import SelectCurrency from "../../Components/selectCurrency/SelectCurrency";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "../../Assets/shopping-bag-svgrepo-com.svg";

import "./nav.styles.scss";
import CartDropdown from "../Cart-dropdown/cart-dropdown";
class Nav extends Component {
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
        <div className="nav">
          <CategoryName />
          <Link to="/">
            <img src={Logo} className="logo" alt="Logo"></img>
          </Link>

          <SelectCurrency />
          {hidden ? null : <CartDropdown />}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ cart: { hidden } }) => ({
  hidden,
});

export default connect(mapStateToProps)(Nav);
