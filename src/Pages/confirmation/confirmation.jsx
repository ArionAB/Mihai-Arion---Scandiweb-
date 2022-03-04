import React, { Component } from "react";
import CheckoutItems from "../../Components/checkout-items/checkout-items";
import Payment from "../../Components/payment-options/payment";

import "./confirmation.styles.scss";

export default class Confirmation extends Component {
  render() {
    return (
      <div className="confirmation">
        <Payment />
        <CheckoutItems />
      </div>
    );
  }
}
