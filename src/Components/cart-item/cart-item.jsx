import React, { Component } from "react";
import { connect } from "react-redux";

import { addItem, removeItem } from "../../Redux/Cart/cart.actions";
import CartGallery from "../CartGallery/CartGallery";

import "./cart-item.styles.scss";

class CartItem extends Component {
  getAttributes() {
    const { item } = this.props;

    return item.attributes?.map((att, index) => {
      const itmVl = item.savedAttr[0].savedAttributes.find(
        (itm) => itm.attID === att.id
      );

      return (
        <div className="size-att" key={att.id}>
          {att.items.map((size, index) => {
            console.log(size.id, "size.id");
            return (item[0].id === size.id &&
              itmVl !== undefined &&
              itmVl.id === size.id) ||
              (item[1]?.id === size.id &&
                itmVl !== undefined &&
                itmVl.id === size.id) ||
              (item[2]?.id === size.id &&
                itmVl !== undefined &&
                itmVl.id === size.id) ? (
              <button
                key={index}
                className={
                  size.value.includes("#") ? "color-btn" : "att-button"
                }
                id={size.value}
                style={
                  size.value.includes("#")
                    ? {
                        background: size.value,
                        color: "transparent",
                      }
                    : {
                        background: "white",
                        color: "black",
                      }
                }
              >
                {size.value}
              </button>
            ) : (
              <button
                className={!size.value.includes("#") ? "no-color" : ""}
                key={index}
                style={
                  size.value.includes("#")
                    ? { display: "none" }
                    : {
                        background: "#ededed",
                        color: "grey",
                        border: "1px solid grey",
                      }
                }
              >
                {size.value}
              </button>
            );
          })}
        </div>
      );
    });
  }

  // <LocalStorage item={item} />

  render() {
    const item = this.props.item;

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
            <button className="plus" onClick={() => addItem(item)}>
              <span className="btn-span">+</span>
            </button>
            <span>{item.quantity}</span>
            <button className="minus" onClick={() => removeItem(item)}>
              <span className="btn-span">-</span>
            </button>
          </div>
          <CartGallery image={item.gallery} />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (param) => dispatch(addItem(param)),
  removeItem: (param) => dispatch(removeItem(param)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
