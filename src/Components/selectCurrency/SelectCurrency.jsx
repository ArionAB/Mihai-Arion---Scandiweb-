import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import Cart from "../../Assets/shopping-cart-svgrepo-com.svg";

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
  SelectCurrencies() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading Currencies</div>;
    }
    if (data.error) {
      return <div>Something went wrong</div>;
    } else {
      return data.currencies.map((currency) => {
        return (
          <option key={currency.label}>
            {currency.symbol} {currency.label}
          </option>
        );
      });
    }
  }
  render() {
    return (
      <div className="currency">
        <select>{this.SelectCurrencies()}</select>
        <img src={Cart} className="shoppingCart" alt="Shopping Cart"></img>
      </div>
    );
  }
}

export default graphql(SELECT_CURRENCY)(SelectCurrency);
