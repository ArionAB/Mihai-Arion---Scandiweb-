import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item";
import { Link } from "react-router-dom";
import { price } from "../../Redux/Currency/currency.actions";

import "./cart-dropdown.styles.scss";
import CheckoutModal from "../checkout-modal/checkout-modal";

class CartDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
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

  getprice() {
    const { selectCurrency, cartItems, price } = this.props;

    const totalPrice = cartItems.reduce(
      (accQuantity, cartItem) =>
        accQuantity +
        cartItem.quantity * cartItem.prices[selectCurrency].amount,
      0
    );
    price(totalPrice);
    return (
      <div className="total-icon">
        <p>{this.totalPriceIcon()}</p>
        <p className="tot-prc">
          {(Math.round(totalPrice * 100) / 100).toFixed(2)}
        </p>
      </div>
    );
  }

  activeModal() {
    const { show } = this.state;
    this.setState = {
      show: !show,
    };
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
          <Link to="/checkout" onClick={this.activeModal()}>
            <button className="check" onClick={this.activeModal()}>
              Check Out
            </button>
          </Link>
          {cartItems.length === 0 ? <CheckoutModal /> : ""}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  price: (props) => dispatch(price(props)),
});

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

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
