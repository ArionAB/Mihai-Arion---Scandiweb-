import React, { Component } from "react";
import CheckoutItems from "../../Components/checkout-items/checkout-items";
import Payment from "../../Components/payment-options/payment";
import { Test } from "../../Components/test";
import { connect } from "react-redux";

import "./confirmation.styles.scss";
import ProgressBar from "../../Components/progress-bar/progress-bar";

class Confirmation extends Component {
  render() {
    return (
      <div className="confirmation">
        <ProgressBar />
        <Payment />
        <Test user={this.props.user} />
        <CheckoutItems />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(Confirmation);
