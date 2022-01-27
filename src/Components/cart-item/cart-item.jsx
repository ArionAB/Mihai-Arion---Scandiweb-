import { getInclusionDirectives } from "@apollo/client/utilities";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import leftArrow from "../../Assets/left-arrow-svgrepo-com.svg";
import { ReactComponent as rightArrow } from "../../Assets/right-arrow-svgrepo-com.svg";
import { addItem, removeItem } from "../../Redux/Cart/cart.actions";
import LocalStorage from "../storage";

import "./cart-item.styles.scss";

class CartItem extends Component {
  /*  state = {
    qty: 0,
  }; */
  getAttributes() {
    const item = this.props.item;
    const savedItem = this.props.savedItem;
    console.log(item);
    return item.attributes?.map((att) => {
      return (
        <div className="size-att">
          {att.items.map((size, index) => {
            return item[0].id === size.id ||
              item[1]?.id === size.id ||
              item[2]?.id === size.id ? (
              <button
                key={index}
                className="att-button"
                id={size.value}
                style={
                  size.value.includes("#")
                    ? { background: size.value, color: size.value }
                    : {
                        background: "black",
                        color: "white",
                      }
                }
              >
                {size.value}
              </button>
            ) : (
              <button
                style={
                  size.value.includes("#")
                    ? { display: "none" }
                    : { background: "white", color: "black" }
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

  /*   componentDidMount() {
    this.setData();
    this.getData();
    const { user } = this.state;
    console.log(user);
  }

  setData() {
    const item = this.props.item;
    localStorage.setItem("myData", JSON.stringify(item));
    console.log(item);
  }

  getData() {
    let data = localStorage.getItem("myData");
    data = JSON.parse(data);
    this.setState({ user: data });
    console.log(data);
  }
 */
  /*   incrementLocal() {
    const item = this.props.item;
    const { qty } = this.state;
    const NewQty = (item.quantity += 1);
    this.setState({ qty: NewQty });
    console.log("*****", qty);
  } */

  render() {
    const item = this.props.item;
    console.log(item.brand);
    // const { user } = this.state;
    // console.log(user);
    const selectCurrency = this.props.selectCurrency;
    const addItem = this.props.addItem;
    const removeItem = this.props.removeItem;

    console.log(item.quantity);
    // const { qty } = this.state;
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
  addItem: (param) => dispatch(addItem(param)),
  removeItem: (param) => dispatch(removeItem(param)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

/* const mapStateToProps = ({ current: { currency }, cart: cartItems }) => ({
  selectCurrency: currency,
  cartItems,
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
}); */
