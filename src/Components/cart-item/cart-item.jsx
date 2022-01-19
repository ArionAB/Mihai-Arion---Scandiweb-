import React, { Component } from "react";
import { connect } from "react-redux";
import leftArrow from "../../Assets/left-arrow-svgrepo-com.svg";
import { ReactComponent as rightArrow } from "../../Assets/right-arrow-svgrepo-com.svg";
import "./cart-item.styles.scss";

class CartItem extends Component {
  getAttributes() {
    const item = this.props.item;

    return item.attributes?.map((att) => {
      return (
        <div className="size-att">
          {att.items.map((size, index) => {
            return (
              <button
                className="att-button"
                key={index}
                style={{ background: size.value, color: size.value }}
              >
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
    const selectCurrency = this.props.selectCurrency;

    return (
      <>
        <div className="btn-img">
          <div className="name">
            <p>{item.brand}</p>
            <p>{item.name}</p>
            <div className="price-symbol">
              <span>{item.prices[selectCurrency].currency.symbol}</span>
              <p>{item.prices[selectCurrency].amount}</p>
            </div>
            {this.getAttributes()}
          </div>

          <div className="increment">
            <div className="plus-minus">
              <button>+</button>
              <span>{item.quantity}</span>
              <button>-</button>
            </div>

            <img className="cart-img" src={item.gallery} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps)(CartItem);
