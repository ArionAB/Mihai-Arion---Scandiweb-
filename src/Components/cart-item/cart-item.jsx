import React, { Component } from "react";

import "./cart-item.styles.scss";

class CartItem extends Component {
  getAttributes() {
    const item = this.props.item;

    return item.attributes?.map((att) => {
      return (
        <div className="size-att">
          {att.items.map((size, index) => {
            return (
              <button className="att-button" key={index}>
                {size.value}
              </button>
            );
          })}
        </div>
      );
    });
  }
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
            {this.getAttributes()}
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