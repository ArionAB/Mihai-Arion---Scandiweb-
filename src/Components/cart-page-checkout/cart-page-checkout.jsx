import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Change } from "../../Assets/change-svgrepo-com.svg";
import StripeCheckoutButton from "../stripe-button";
import "./cart-page-checkout.styles.scss";

class CPCheckout extends Component {
  constructor() {
    super();
    this.state = {
      statePrice: 0,
    };
  }

  totalPriceIcon() {
    const selectCurrency = this.props.selectCurrency;
    if (selectCurrency === 0) {
      return "$";
    } else if (selectCurrency === 1) {
      return "£";
    } else if (selectCurrency === 2) {
      return "A$";
    } else if (selectCurrency === 3) {
      return "¥";
    } else return "₽";
  }

  deliveryPrice() {
    const selectCurrency = this.props.selectCurrency;
    if (selectCurrency === 0) {
      return "20";
    } else if (selectCurrency === 1) {
      return "15";
    } else if (selectCurrency === 2) {
      return "27";
    } else if (selectCurrency === 3) {
      return "2.303";
    } else return "89";
  }

  getprice() {
    const { selectCurrency, cartItems } = this.props;

    const totalPrice = cartItems.reduce(
      (accQuantity, cartItem) =>
        accQuantity +
        cartItem.quantity * cartItem.prices[selectCurrency].amount,
      0
    );

    return (
      <div className="total-icon">
        <p>{this.totalPriceIcon()}</p>
        <p className="tot-prc">
          {(Math.round(totalPrice * 100) / 100).toFixed(2)}
        </p>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    this.getprice();

    return (
      <div className="CPC">
        <h1>
          Total Price <span className="fee">{this.getprice()}</span>
        </h1>
        <p className="delivery">
          Delivery fee{" "}
          <span>
            {this.totalPriceIcon()}
            {this.deliveryPrice()}
          </span>
        </p>

        <div>
          {user ? (
            <Link to="/checkout">Place Order</Link>
          ) : (
            <Link to="/register">Place Order</Link>
          )}
        </div>
        <div className="policy">
          <Change className="change-icon" />
          <p>100 days free return policy</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  cart: { cartItems, attributes },
  current: { currency },
  user: { user },
}) => ({
  selectCurrency: currency,
  cartItems,
  attributes,
  user,
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps)(CPCheckout);
