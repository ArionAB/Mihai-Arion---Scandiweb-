import React, { Component } from "react";
import CartItem from "../../Components/cart-item/cart-item";
import { connect } from "react-redux";

import "./cart-page.styles.scss";

class CartPage extends Component {
  render() {
    const cartItems = this.props.cartItems;

    return (
      <div className="cart-page">
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
});

export default connect(mapStateToProps)(CartPage);
