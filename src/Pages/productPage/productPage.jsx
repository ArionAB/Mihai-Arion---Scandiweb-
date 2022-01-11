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
      item: {},
      active: false,
      chosenImage: [],
      savedAttributes: [],
      prices: [],
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

  getGallery() {
    const { item } = this.state;
    const gallery = item.gallery;

    const entries = Object.entries(gallery ? gallery : "");

    return entries.map((entry) => {
      console.log(entry);
      console.log(entry[1]);
      /*       entry.filter((filtru) => {
        if (filtru[0] == entry[0]);

        alert("nu e egal");
      }); */
      return (
        <>
          <p>{entry[0]}</p>
          <img
            className={this.state.active ? "images" : "oneImage"}
            onClick={this.toggleClass}
            src={entry[1]}
            alt=""
          ></img>
        </>
      );
    });
  }

  render() {
    const { item } = this.state;

    return (
      <div>
        <h1>{item.brand}</h1>
        <div className="gallery">{this.getGallery()}</div>
        <div></div>
      </div>
    );
  }
}
/* const gallery = item.gallery;
    for (const photo of gallery) {
      console.log(photo);
    } */

const mapStateToProps = (state) => ({
  prodId: state.product.prodID,
});

export default ProductPage;

/* export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})(ProductPage);
connect(mapStateToProps)(ProductPage); */

/* export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})(ProductPage); */

/* export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})()(<ProductPage  params={useParams()}/>) */
