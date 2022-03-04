import React, { Component } from "react";
import { connect } from "react-redux";

import "./checkout-items.styles.scss";

class CheckoutItems extends Component {
  getCurrency() {
    const { currency } = this.props;

    if (currency === 0) {
      return "$";
    } else if (currency === 1) {
      return "£";
    } else if (currency === 2) {
      return "A$";
    } else if (currency === 3) {
      return "¥";
    } else return "₽";
  }
  render() {
    const { cartItems, currency, price } = this.props;

    return (
      <div className="column">
        <div className="check-items">
          <h1>Your order</h1>
          <div className="item">
            {cartItems.map((item, index) => {
              return (
                <div className="item-card" key={index}>
                  <img src={item.gallery} alt="cartItem" />
                  <div className="brand">
                    <h2>{item.brand}</h2>
                    <h3>{item.name}</h3>
                  </div>
                  <p className="qty">
                    Qty <span>{item.quantity}</span>
                  </p>
                  <div>
                    {item[0] ? (
                      <div className="att">
                        <p>{item[0].attID}</p> <span>{item[0].hex}</span>
                      </div>
                    ) : (
                      ""
                    )}
                    {item[1] ? (
                      <div className="att">
                        <p>{item[1]?.attID}</p>{" "}
                        <span
                          style={
                            item[1]?.hex.includes("#")
                              ? {
                                  background: item[1].hex,
                                  color: "transparent",
                                }
                              : {
                                  background: "white",
                                  color: "black",
                                }
                          }
                        >
                          {item[1]?.hex}
                        </span>{" "}
                      </div>
                    ) : (
                      ""
                    )}
                    {item[2] ? (
                      <div className="att">
                        <p>{item[2]?.attID}</p> <span>{item[2]?.hex}</span>{" "}
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

        <div className="price">
          Total <span>{this.getCurrency()}</span>
          {price}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  cart: { cartItems },
  current: { currency, price },
}) => ({
  cartItems,
  currency,
  price,
});

export default connect(mapStateToProps)(CheckoutItems);
