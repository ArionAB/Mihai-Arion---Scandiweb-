import React, { Component } from "react";

import Cart from "../../../Assets/shopping-cart-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { client } from "../../../index";
import { connect } from "react-redux";
import { addItem } from "../../../Redux/Cart/cart.actions";
import { GET_ALL } from "../../../GraphQL/queries";

import "./all.styles.scss";

class All extends Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.state = {
      category: [],
      prices: 0,
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    const title = this.props.title;

    const response = await client.query({
      query: GET_ALL,
      variables: {
        title: title,
      },
    });
    this.setState({ category: response.data.category });
  }

  mapCategories() {
    const { category } = this.state;
    const selectCurrency = this.props.selectCurrency;

    return category.products?.map((product, index) => {
      const hasAttributes = product.attributes ? product.attributes.length : "";

      const addItem = this.props.addItem;

      return (
        <div key={index}>
          <Link to={`/product/${product.id}`}>
            <div key={index} className="card">
              <img
                className="card-img"
                src={product.gallery}
                alt={product.id}
              ></img>
              {!product.inStock && <div className="stock">OUT OF STOCK</div>}

              <img
                src={Cart}
                alt="cart"
                className="cart"
                onClick={() => {
                  if (
                    (hasAttributes && !product.inStock) ||
                    (!hasAttributes && !product.inStock)
                  ) {
                    alert("Product out of stock");
                  } else if (hasAttributes) {
                    alert("Please select an attribute");
                  } else addItem(product);
                }}
              />
              <div className="name-price">
                <p className="name">{product.name}</p>
                <div className="price">
                  <p>{product.prices[selectCurrency].currency.symbol}</p>
                  <p>{product.prices[selectCurrency].amount}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }
  render() {
    return <div className="container">{this.mapCategories()}</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (cacat) => dispatch(addItem(cacat)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
