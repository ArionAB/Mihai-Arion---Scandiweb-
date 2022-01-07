import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { useParams } from "react-router-dom";

/* class ProductPage extends Component {
  render() {
    return <div></div>;
  }
}

export default ProductPage; */

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

const GET_PRODUCT = gql`
  query {
    product(id: "huarache-x-stussy-le") {
      id
      name
    }
  }
`;

/* const GET_CATEGORY_NAMES = gql`
  query {
    categories {
      name
    }
  }
`; */

// const id = this.props.match.params.id;
class ProductPage extends Component {
  GetAll() {
    const data = this.props.data;
    console.log(data);
    console.log(data.products); //undef
    console.log(data.product);
    if (data.loading) {
      return <div>Loading Product</div>;
    }
    if (data.error) {
      return <div>Something went wrong on product page</div>;
    } else {
      return (
        <div key={data.product.id}>
          <p>{data.product.id}</p>
          <p>{data.product.name}</p>
        </div>
      );
    }
  }
  render() {
    return <div>{this.GetAll()}</div>;
  }
}

export default graphql(GET_PRODUCT)(ProductPage);

/* function ProductPage({ data }) {
  const { id } = useParams();

  return (
    <div>
      {data.category.products
        .filter((card) => card.id === id)
        // card.id === id
        .map((card) => (
          <div key={card.id}>
            <h1>{card.id}</h1>
          </div>
        ))}
    </div>
  );
}
export default ProductPage; */
// export default graphql(GET_PRODUCT)(ProductPage);
