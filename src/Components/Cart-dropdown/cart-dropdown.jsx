import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item";
import { Link } from "react-router-dom";

import "./cart-dropdown.styles.scss";

class CartDropdown extends Component {
  render() {
    const cartItems = this.props.cartItems;
    const itemCount = this.props.itemCount;

    return (
      <div className="cart-dropdown">
        <div className="mybag">My bag, {itemCount} items</div>
        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>

        <div className="buttons">
          <Link to="/cart">
            <button>View Bag</button>
          </Link>
          <button>Check Out</button>
        </div>
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

export default connect(mapStateToProps)(CartDropdown);
