import React, { Component } from "react";

import "../checkout-modal/checkout-modal.styles.scss";
export default class CheckoutModal extends Component {
  render() {
    return (
      <div className="modal">
        <p>Your need to add an item before checking out </p>
      </div>
    );
  }
}
