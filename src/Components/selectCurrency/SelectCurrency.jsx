import React, { Component } from "react";

import { client } from "../../index";
import { ReactComponent as Cart } from "../../Assets/shopping-cart-svgrepo-com.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../Redux/Cart/cart.actions";
import { selectCurrency } from "../../Redux/Currency/currency.actions";
import { ReactComponent as DownArrow } from "../../Assets/down-arrow-svgrepo-com.svg";
import { ReactComponent as UpArrow } from "../../Assets/up-arrow-svgrepo-com.svg";
import { SELECT_CURRENCY } from "../../GraphQL/queries";
import { Link } from "react-router-dom";
import { logout } from "../firebase";

import "./selectCurrency.styles.scss";

class SelectCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      show: false,
      currentUser: null,

      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this.getCurrencies();
    this.setState({ currentUser: this.props.user });
  }

  async getCurrencies() {
    const response = await client.query({
      query: SELECT_CURRENCY,
    });
    this.setState({ data: response.data });
  }

  chooseCurrency() {
    const { data, show } = this.state;

    return data.currencies?.map((currency, index) => {
      return show ? (
        <li value={index} key={index}>
          {currency.symbol} {currency.label}
        </li>
      ) : (
        ""
      );
    });
  }

  modalIcon() {
    const { value } = this.state;
    const { selectCurrency } = this.props;
    selectCurrency(value);
    if (value === 0) {
      return "$";
    } else if (value === 1) {
      return "£";
    } else if (value === 2) {
      return "A$";
    } else if (value === 3) {
      return "¥";
    } else return "₽";
  }

  handleClick = () => {
    if (!this.state.show) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  handleOutsideClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.handleClick();
    }
  };

  async handleLogout() {
    try {
      await logout();
      this.setState({ currentUser: null });
    } catch {
      alert("error");
    }
  }

  render() {
    const { hidden, itemCount, user } = this.props;
    const { show } = this.state;

    return (
      <div className="currency">
        {user !== null ? (
          <div className="register" onClick={() => this.handleLogout()}>
            Sign Out
          </div>
        ) : (
          <Link className="register" to="/register">
            Sign In
          </Link>
        )}

        <div
          className="symbol"
          ref={(node) => {
            this.node = node;
          }}
          onClick={() => this.handleClick()}
        >
          {this.modalIcon()}{" "}
          {show ? (
            <UpArrow className="down-arrow" />
          ) : (
            <DownArrow className="down-arrow" />
          )}
          <ul value={this.state.value} onClick={this.handleChange}>
            {this.chooseCurrency()}
          </ul>
        </div>

        <div className="toggle" onClick={() => this.props.toggleCartHidden()}>
          <Cart className="shoppingCart" />
          {!hidden ? <div className="overlay"></div> : ""}

          <span className="item-count">{itemCount}</span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  selectCurrency: (props) => dispatch(selectCurrency(props)),
});

const mapStateToProps = ({
  cart: { cartItems },
  cart: { hidden },
  user: { user },
}) => ({
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
  hidden,
  user,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
