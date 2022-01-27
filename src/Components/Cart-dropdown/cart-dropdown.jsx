import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item";
import { Link } from "react-router-dom";

import "./cart-dropdown.styles.scss";

class CartDropdown extends Component {
  constructor(props) {
    super(props);
    /*   this.state = {
      newData: undefined,
    }; */
  }

  /*   componentDidMount() {
    this.setData();
  } */

  /*   setData() {
    const cartItems = this.props.cartItems;
    localStorage.setItem("myData", JSON.stringify(cartItems));
  } */

  getData() {
    // const { newData } = this.state;
    let data = localStorage.getItem("myData");
    data = JSON.parse(data);
    console.log(data);
    if (data === undefined) {
      console.log(data);
      return data;
    } else return;
    /*  if (newData === undefined) {
      this.setState({ newData: data });
    } else return; */

    // const { newData } = this.state;
    // console.log(newData);
    // this.setState({ user: data });
    // console.log(data);
    // console.log(user);
  }

  getprice() {
    const cartItems = this.props.cartItems;
    const selectCurrency = this.props.selectCurrency;
    const totalPrice = cartItems.reduce(
      (accQuantity, cartItem) =>
        accQuantity +
        cartItem.quantity * cartItem.prices[selectCurrency].amount,
      0
    );

    return <div>{(Math.round(totalPrice * 100) / 100).toFixed(2)}</div>;
  }
  render() {
    // this.getData();
    this.getprice();

    // const { newData } = this.state;

    const itemCount = this.props.itemCount;
    let data = localStorage.getItem("myData");
    data = JSON.parse(data);
    console.log(data);

    return (
      <div className="cart-dropdown">
        <div className="mybag">My bag, {itemCount} items</div>
        <div className="cart-items">
          {data && data.length ? (
            data.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        <div className="total-price">Total {this.getprice()}</div>
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

const mapStateToProps = ({
  cart: { cartItems, attributes },
  current: { currency },
}) => ({
  selectCurrency: currency,
  cartItems,
  attributes,
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps)(CartDropdown);

/* return (
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
    <div className="total-price">Total {this.getprice()}</div>
    <div className="buttons">
      <Link to="/cart">
        <button>View Bag</button>
      </Link>
      <button>Check Out</button>
    </div>
  </div>
); */
