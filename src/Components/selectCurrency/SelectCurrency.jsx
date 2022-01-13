import React, { Component } from "react";
import { gql } from "@apollo/client";
import { client } from "../../index";
import { ReactComponent as Cart } from "../../Assets/shopping-cart-svgrepo-com.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../Redux/Cart/cart.actions";

import "./selectCurrency.styles.scss";

const SELECT_CURRENCY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class SelectCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const response = await client.query({
      query: SELECT_CURRENCY,
    });
    this.setState({ data: response.data });
  }

  selectCurrency() {
    const { data } = this.state;

    return data.currencies?.map((currency) => {
      return (
        <option key={currency.label}>
          {currency.symbol} {currency.label}
        </option>
      );
    });
  }

  // <select>{this.SelectCurrencies()}</select>
  render() {
    const itemCount = this.props.itemCount;
    return (
      <div className="currency">
        <select>{this.selectCurrency()}</select>

        <div className="toggle" onClick={() => this.props.toggleCartHidden()}>
          <Cart className="shoppingCart" />
          <span className="item-count">{itemCount}</span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
