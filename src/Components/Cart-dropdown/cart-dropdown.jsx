import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item";
import { Link } from "react-router-dom";

import "./cart-dropdown.styles.scss";

class CartDropdown extends Component {
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

  getprice() {
    const cartItems = this.props.cartItems;
    const selectCurrency = this.props.selectCurrency;

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
    this.getprice();
    const cartItems = this.props.cartItems;

    const itemCount = this.props.itemCount;

    return (
      <div className="cart-dropdown">
        <div className="mybag">
          <span>My bag,</span>
          {itemCount} items
        </div>
        <div className="cart-items">
          {cartItems && cartItems.length ? (
            cartItems.map((cartItem, index) => (
              <CartItem key={index} item={cartItem} />
            ))
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        <div className="total-price">Total {this.getprice()}</div>
        <div className="buttons">
          <Link to="/cart">
            <button className="bag">View Bag</button>
          </Link>
          <button className="check">Check Out</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  cart: { cartItems, attributes },
  current: { currency },
}) => ({
  selectCurrency: currency,
  cartItems,
  attributes,
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps)(CartDropdown);
