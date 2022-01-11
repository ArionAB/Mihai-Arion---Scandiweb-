import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
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
  // <select>{this.SelectCurrencies()}</select>
  render() {
    return (
      <div className="currency">
        <div onClick={toggleCartHidden}>
          <Cart className="shoppingCart" onClick={toggleCartHidden} />
          <span className="item-count" onClick={toggleCartHidden}>
            0
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(SelectCurrency);

// graphql(SELECT_CURRENCY)(SelectCurrency)
