import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item";
import { Link } from "react-router-dom";

import "./cart-dropdown.styles.scss";
import cartItem from "../cart-item/cart-item";

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
        {(Math.round(totalPrice * 100) / 100).toFixed(2)}
      </div>
    );
  }

  test() {
    const cartItems = this.props.cartItems;

    cartItems?.map((item) =>
      item.savedAttr.map((cartItem) =>
        cartItem.savedAttributes.every((e, i) => console.log(e.id))
      )
    );

    // newCart.map((something) => console.log(something.savedAttr));
  }

  render() {
    this.test();
    this.getprice();
    const cartItems = this.props.cartItems;

    const itemCount = this.props.itemCount;

    return (
      <div className="cart-dropdown">
        <div className="mybag">My bag, {itemCount} items</div>
        <div className="cart-items">
          {cartItems && cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
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

/* export const addItemToCart = (cartItems, cartItemToAdd) => {
  if (cartItemToAdd[0].id) {
    const match = cartItems.find((cartItem) => cartItem.id == cartItemToAdd.id);
    const other = cartItems.find((item) =>
      item.savedAttr.find((Cartitem) =>
        Cartitem.savedAttributes.every((e, i) => e.id === cartItemToAdd[i].id)
      )
    );
    console.log("read me");
    if (other && match) {
      return cartItems?.map((item) =>
        item.savedAttr.map((cartItem) =>
          cartItem.savedAttributes.every((e, i) => e.id === cartItemToAdd[i].id)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  } else {
    const match = cartItems.find(
      (item) => item.item.name === cartItemToAdd.item.name
    );

    if (match) {
      return cartItems.map((cartItem) =>
        cartItem.item.name === cartItemToAdd.item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
}; */
