import React, { Component } from "react";

import "./cart-dropdown.styles.scss";

class CartDropdown extends Component {
  render() {
    return (
      <div className="cart-dropdown">
        <div className="cart-items"></div>
        <div className="buttons">
          <button>View Bag</button>
          <button>Check Out</button>
        </div>
      </div>
    );
  }
}

export default CartDropdown;
