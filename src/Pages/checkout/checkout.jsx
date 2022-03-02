import React, { Component } from "react";
import Billing from "../../Components/Billing-Address/billing";
import CheckoutItems from "../../Components/checkout-items/checkout-items";

import "./checkout.styles.scss";

class checkout extends Component {
  render() {
    return (
      <div className="checkout">
        <Billing />
        <CheckoutItems />
      </div>
    );
  }
}

export default checkout;
