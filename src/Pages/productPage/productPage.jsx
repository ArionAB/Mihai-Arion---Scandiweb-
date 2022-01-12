import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import GetId from "../../Components/GetId";
import { client } from "../../index";

import "./productPage.styles.scss";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      brand
      name
      gallery
      inStock
      description
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.toggleClass = this.toggleClass.bind(this);

    this.state = {
      item: [],
      active: false,
      chosenImage: [],
      savedAttributes: [],
      prices: [],
      index: 0,
    };
  }
  componentDidMount() {
    this.getProduct();
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  async getProduct() {
    const id = this.props.id;

    const response = await client.query({
      query: GET_PRODUCT,
      variables: {
        id: id,
      },
    });

    this.setState({ item: response.data.product });
  }

  getAttributes() {
    const { item } = this.state;

    return item.attributes?.map((att) => {
      return (
        <div>
          <div>
            <p>{att.name}</p>
          </div>
          <div>
            {att.items.map((size, index) => {
              return <button key={index}>{size.value}</button>;
            })}
          </div>
        </div>
      );
    });
  }

  handleTab(index) {
    this.setState({ index: index });
  }

  getGallery() {
    const { item } = this.state;

    const gallery = item.gallery;

    const entries = Object.entries(gallery ? gallery : "");

    return entries.map((entry, index) => {
      return (
        <div className="thumb">
          <img
            onClick={() => this.handleTab(index)}
            key={index}
            src={entry[1]}
            alt=""
          ></img>
        </div>
      );
    });
  }
  /*   getGallery() {
    const { item, index } = this.state;
    const gallery = item.gallery;

    return gallery?.map((entry) => {
      console.log(entry, index);
      return (
        <div className="thumb">
          <img
            onClick={() => this.handleTab(index)}
            key={index}
            className={this.state.active ? "images" : "oneImage"}
            src={entry}
            alt=""
          ></img>
        </div>
      );
    });
  } */

  render() {
    const { item, index } = this.state;
    const gallery = item.gallery;

    const newObj = Object.assign({}, gallery);

    return (
      <div className="container">
        <img src={newObj[index]} alt="" />
        <div className="gallery">{this.getGallery()}</div>

        <div className="specs">
          <h1>{item.brand}</h1>
          <h2>{item.name}</h2>
          <div>{this.getAttributes()}</div>
          <button>ADD TO CART</button>
          <p>{item.description}</p>
        </div>
      </div>
    );
  }
}
//  const gallery = item.gallery;
//     for (const photo of gallery) {
//       console.log(photo);
//     }

const mapStateToProps = (state) => ({
  prodId: state.product.prodID,
});

export default ProductPage;

// /* export default graphql(GET_PRODUCT, {
//   options: { variables: { id } },
// })(ProductPage);
// connect(mapStateToProps)(ProductPage); */

/* export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})(ProductPage); */

/* export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})()(<ProductPage  params={useParams()}/>) */
