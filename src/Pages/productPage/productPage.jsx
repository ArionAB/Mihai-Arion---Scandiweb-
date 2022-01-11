import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import GetId from "../../Components/GetId";
import { client } from "../../index";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      brand
      name
    }
  }
`;

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.getProduct = this.getProduct.bind(this);
    // this.mapProduct = this.mapProduct.bind(this);

    this.state = {
      item: {},
      chosenImage: [],
      savedAttributes: [],
      prices: [],
    };
  }
  componentDidMount() {
    this.getProduct();
  }
  /*   mapProduct() {
    if (this.state.item) {
      this.setState((prevState) => {
        const emptyAttrs = this.state.item.attributes.map((i) => {
          return {
            id: i.id,
            name: i.name,
            type: i.type,
            item: null,
          };
        });
        return { ...prevState, savedAttributes: emptyAttrs };
      });
      this.setState({ chosenImage: this.state.item.gallery[0] });
    }
  } */

  async getProduct() {
    const id = this.props.id;
    console.log(id);

    const response = await client.query({
      query: GET_PRODUCT,
      variables: {
        id: id,
      },
    });
    console.log(response, "***RESPONSE***");
    this.setState({ item: response.data.product });
    console.log({ item: response.data.product }, "***ITEM");
    // this.mapProduct();

    // console.log(response.data.product);
    // console.log(response.data.product.brand);
    // const { item } = this.state;
    // console.log(item);
    // return <div>{item.id}</div>;
  }

  render() {
    const { item } = this.state;
    console.log(item);
    // return <div>{this.GetAll()}</div>;
    // return <div>{this.getProduct()}</div>;
    return <div>{item.brand}</div>;
  }
}

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
