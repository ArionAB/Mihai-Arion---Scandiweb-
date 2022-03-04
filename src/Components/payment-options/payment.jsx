import React, { Component } from "react";
import { ReactComponent as Visa } from "../../Assets/visa-svgrepo-com.svg";
import { ReactComponent as COD } from "../../Assets/cash-svgrepo-com.svg";
import "./payment.styles.scss";
import StripeCheckoutButton from "../stripe-button";

class Payment extends Component {
  render() {
    return (
      <div className="payment">
        <h1>Choose payment option</h1>
        <div className="all-pay">
          <label className="method">
            <input type="radio" name="radio"></input>
            <Visa className="payment-meth" />
            <p className="stripe">Visa Credit Card</p>
          </label>

          <label className="method">
            <input type="radio" name="radio"></input>
            <COD className="payment-meth" />
            <p className="stripe">Cash On Delivery</p>
          </label>

          <label className="method">
            <input type="radio" name="radio"></input>
            <StripeCheckoutButton className="payment-meth" />
            <p className="stripe">Stripe Payment</p>
          </label>
        </div>
      </div>
    );
  }
}

export default Payment;
