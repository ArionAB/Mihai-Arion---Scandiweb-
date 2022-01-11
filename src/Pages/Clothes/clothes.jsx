import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { withQuery } from "@apollo/client/react/hoc";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./clothes.styles.scss";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()}></Component>;
}

const GET_CLOTHES = gql`
  query {
    category(input: { title: "clothes" }) {
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

//  class Clothes extends Component {
//   render(title) {
//     <withQuery query={GET_CLOTHES} variables={{ title: title }}>
//       {}
//     </withQuery>;
//     console.log(title);
//     return <div></div>;
//   }
// }
class Clothes extends Component {
  GetClothes() {
    const data = this.props.data;
    console.log(data);
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
    return <div className="container">{this.GetClothes()}</div>;
  }
}

export default graphql(GET_CLOTHES)(Clothes);
