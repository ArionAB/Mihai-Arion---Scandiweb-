import React, { Component } from "react";
import { gql } from "@apollo/client";
import { client } from "../../index";
import { ReactComponent as Cart } from "../../Assets/shopping-cart-svgrepo-com.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../Redux/Cart/cart.actions";
import { selectCurrency } from "../../Redux/Currency/currency.actions";

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

      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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

  chooseCurrency() {
    const { data } = this.state;

    return data.currencies?.map((currency, index) => {
      return (
        <option value={index}>
          {currency.symbol} {currency.label}
        </option>
      );
    });
  }

  render() {
    const itemCount = this.props.itemCount;
    const selectCurrency = this.props.selectCurrency;

    const { value } = this.state;
    selectCurrency(value);

    return (
      <div className="currency">
        <select value={this.state.value} onChange={this.handleChange}>
          {this.chooseCurrency()}
        </select>

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
  selectCurrency: (pisat) => dispatch(selectCurrency(pisat)),
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
