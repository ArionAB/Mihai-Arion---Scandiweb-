import React, { Component } from "react";
import { gql } from "@apollo/client";

import Cart from "../../../Assets/shopping-cart-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { client } from "../../../index";
import { connect } from "react-redux";

import "./all.styles.scss";
import ProductPage from "../../productPage/productPage";

const GET_ALL = gql`
  query category($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        gallery
        name
        inStock

        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

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

  /*   componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.getCategories();
    }
  } */

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
      return (
        <div>
          <Link to={`/product/${product.id}`}>
            <div key={index} className="card">
              <img src={product.gallery} alt="product"></img>
              {!product.inStock && <div className="stock">OUT OF STOCK</div>}

              <img src={Cart} alt="cart" className="cart" />

              <p className="name">{product.name}</p>
              <div className="price">
                <p>{product.prices[selectCurrency].currency.symbol}</p>
                <p>{product.prices[selectCurrency].amount}</p>
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

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps)(All);
