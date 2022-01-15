import React, { Component } from "react";
import CartItem from "../../Components/cart-item/cart-item";
import { connect } from "react-redux";

import "./cart-page.styles.scss";

class CartPage extends Component {
  render() {
    const cartItems = this.props.cartItems;
    const itemCount = this.props.itemCount;
    return (
      <div className="cart-items">
        <h1>CART</h1>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps)(CartPage);
