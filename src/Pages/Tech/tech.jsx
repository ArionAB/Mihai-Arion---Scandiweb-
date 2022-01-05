import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { withQuery } from "@apollo/client/react/hoc";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()}></Component>;
}

const GET_TECH = gql`
  query {
    category(input: { title: "tech" }) {
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

//  class Tech extends Component {
//   render(title) {
//     <withQuery query={GET_Tech} variables={{ title: title }}>
//       {}
//     </withQuery>;
//     console.log(title);
//     return <div></div>;
//   }
// }
class Tech extends Component {
  GetTech() {
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
    return <div className="container">{this.GetTech()}</div>;
  }
}

export default graphql(GET_TECH)(Tech);
