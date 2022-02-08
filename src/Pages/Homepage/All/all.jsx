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
      savedAttributes: [],
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
  getCategName() {
    const categName = this.state.category.name;
    return categName;
  }

  mapCategories() {
    const { category } = this.state;
    console.log(category);
    const selectCurrency = this.props.selectCurrency;

    return category.products?.map((product, index) => {
      const hasAttributes = product.attributes ? product.attributes.length : "";

      const addItem = this.props.addItem;
      const { savedAttributes } = this.state;
      const newItem = Object.assign(savedAttributes, product);

      return (
        <div key={index}>
          <Link to={`/product/${product.id}`}>
            <div key={index} className="card">
              <img
                className="card-img"
                src={product.gallery[0]}
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
                  } else if (hasAttributes === 0) {
                    savedAttributes.push("attribute") &&
                      addItem(newItem) &&
                      alert("Item added to cart");
                  }
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
    return (
      <>
        <div className="categ-name"> {this.getCategName()}</div>
        <div className="container">{this.mapCategories()}</div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (cacat) => dispatch(addItem(cacat)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
