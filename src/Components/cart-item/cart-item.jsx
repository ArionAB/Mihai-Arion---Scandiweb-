import React, { Component } from "react";

import "./cart-item.styles.scss";

class CartItem extends Component {
  render() {
    const item = this.props.item;
    console.log(item);
    return (
      <>
        <div className="btn-img">
          <div className="name">
            <p>{item.name}</p>
            <div className="price-symbol">
              <span>{item.prices[0].currency.symbol}</span>{" "}
              <p>{item.prices[0].amount}</p>
            </div>
          </div>

          <div className="increment">
            <button>+</button>
            <span>{item.quantity}</span>
            <button>-</button>
          </div>
          <div>
            <img className="cart-img" src={item.gallery} />
          </div>
        </div>
      </>
    );
  }
}

export default CartItem;
