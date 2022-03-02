import React, { Component } from "react";
import CartItem from "../../Components/cart-item/cart-item";
import { connect } from "react-redux";

import "./cart-page.styles.scss";
import CPCheckout from "../../Components/cart-page-checkout/cart-page-checkout";

class CartPage extends Component {
  render() {
    const cartItems = this.props.cartItems;

    return (
      <div className="full">
        <div className="cart-page">
          <h1>CART</h1>
          {cartItems.length ? (
            cartItems.map((cartItem, index) => (
              <CartItem key={index} item={cartItem} />
            ))
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        <CPCheckout />
      </div>
    );
  }
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

export default connect(mapStateToProps)(CartPage);
