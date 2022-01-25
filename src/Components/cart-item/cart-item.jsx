import React, { Component } from "react";
import { connect } from "react-redux";
import leftArrow from "../../Assets/left-arrow-svgrepo-com.svg";
import { ReactComponent as rightArrow } from "../../Assets/right-arrow-svgrepo-com.svg";
import { addItem, removeItem } from "../../Redux/Cart/cart.actions";
import "./cart-item.styles.scss";

class CartItem extends Component {
  getAttributes() {
    const item = this.props.item;

    return item.attributes?.map((att) => {
      return (
        <div className="size-att">
          {att.items.map((size, index) => {
            return item[0].id === size.id ? (
              <button
                className="att-button"
                key={index}
                style={{
                  background: "black",
                  color: "white",
                }}
              >
                {size.value}
              </button>
            ) : (
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
  /*   getAttributes() {
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
                {item[0].id}
              </button>
            );
          })}
        </div>
      );
    });
  } */
  render() {
    const item = this.props.item;
    console.log(item[0].id);
    const selectCurrency = this.props.selectCurrency;
    const addItem = this.props.addItem;
    const removeItem = this.props.removeItem;

    return (
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
            <button onClick={() => addItem(item)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => removeItem(item)}>-</button>
          </div>

          <img className="cart-img" src={item.gallery} />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (cacat) => dispatch(addItem(cacat)),
  removeItem: (item) => dispatch(removeItem(item)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
