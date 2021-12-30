import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import "./all.styles.scss";

const GET_ALL = gql`
  query {
    category {
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
  GetAll() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading Currencies</div>;
    }
    if (data.error) {
      return <div>Something went wrong</div>;
    } else {
      return data.category.products.map((product) => {
        console.log(product.prices);
        // <p>{product.prices}</p>

        return (
          <div key={product.id} className="card">
            <img src={product.gallery} alt="product"></img>
            <p className="name">{product.name}</p>
          </div>
        );
      });
    }
  }
  render() {
    return <div className="container">{this.GetAll()}</div>;
  }
}

export default graphql(GET_ALL)(All);
