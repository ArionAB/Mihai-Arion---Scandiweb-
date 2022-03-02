import React, { Component } from "react";
import { connect } from "react-redux";

import "./checkout-items.styles.scss";

class CheckoutItems extends Component {
  render() {
    const { cartItems, currency } = this.props;

    return (
      <div className="check-items">
        <h1>Your order</h1>
        <div className="item">
          {cartItems.map((item) => {
            return (
              <div className="item-card" key={item.id}>
                <img src={item.gallery} alt="cartItem" />
                <div className="brand">
                  <h2>{item.brand}</h2>
                  <h3>{item.name}</h3>
                </div>
                <div>
                  {item[0] ? (
                    <div className="att">
                      <p>{item[0].attID}</p> <span>{item[0].id}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {item[1] ? (
                    <div className="att">
                      <p>{item[1]?.attID}</p> <span>{item[1]?.id}</span>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {item[2] ? (
                    <div className="att">
                      <p>{item[2]?.attID}</p> <span>{item[2]?.id}</span>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="price">
                  <span>{item.prices[currency].currency.symbol}</span>
                  {item.prices[currency].amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart: { cartItems }, current: { currency } }) => ({
  cartItems,
  currency,
});

export default connect(mapStateToProps)(CheckoutItems);
