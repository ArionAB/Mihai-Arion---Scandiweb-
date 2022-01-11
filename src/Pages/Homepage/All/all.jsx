import React, { Component } from "react";
import { gql, throwServerError } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import Cart from "../../../Assets/shopping-cart-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { client } from "../../../index";

import "./all.styles.scss";
import ProductPage from "../../productPage/productPage";
import { compose } from "redux";

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
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      console.log(prevProps.category);
      this.getCategories();
    }
  }

  async getCategories() {
    const title = this.props.title;
    console.log(title);

    const response = await client.query({
      query: GET_ALL,
      variables: {
        title: title,
      },
    });
    this.setState({ category: response.data.category });
    this.forceUpdate();
  }

  mapCategories() {
    const { category } = this.state;

    return category.products?.map((product, index) => {
      return (
        <Link to={`/product/${product.id}`}>
          <div key={index} className="card">
            <img src={product.gallery} alt="product"></img>
            {!product.inStock && <div className="stock">OUT OF STOCK</div>}

            <img src={Cart} alt="cart" className="cart" />

            <p className="name">{product.name}</p>
            <div className="price">
              <p>{product.prices[0].currency.symbol}</p>
              <p>{product.prices[0].amount}</p>
            </div>
          </div>
        </Link>
      );
    });
  }
  render() {
    return <div className="container">{this.mapCategories()}</div>;
  }
}

export default All;
