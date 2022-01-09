import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { ReactComponent as Cart } from "../../Assets/shopping-cart-svgrepo-com.svg";

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
        <div>
          <Cart className="shoppingCart" />
          <span className="item-count">0</span>
        </div>
      </div>
    );
  }
}

export default graphql(SELECT_CURRENCY)(SelectCurrency);
