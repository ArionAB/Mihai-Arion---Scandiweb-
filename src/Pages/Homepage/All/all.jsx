import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import "./all.styles.scss";

/* const GET_ALL = gql`
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
`; */
const GET_ALL = gql`
  query {
    category(input: { title: "all" }) {
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
        return (
          <div key={product.id} className="card">
            <img src={product.gallery} alt="product"></img>
            <p className="name">{product.name}</p>
            <div className="price">
              <p>{product.prices[0].currency.symbol}</p>
              <p>{product.prices[0].amount}</p>
            </div>
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
/* export default graphql(GET_ALL, {
  variables: {
    title
  }
})(All); */
