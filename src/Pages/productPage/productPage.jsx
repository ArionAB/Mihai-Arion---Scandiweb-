import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import GetId from "../../Components/GetId";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
    }
  }
`;

// const id = "huarache-x-stussy-le";

class ProductPage extends Component {
  GetAll() {
    const data = this.props.data;
    // const id = this.props.id;
    const id = this.props.params;

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
const id = "huarache-x-stussy-le";

const mapStateToProps = (state) => ({
  prodId: state.product.prodID,
});

export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})(ProductPage);
connect(mapStateToProps)(ProductPage);

/* export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})(ProductPage); */

/* export default graphql(GET_PRODUCT, {
  options: { variables: { id } },
})()(<ProductPage  params={useParams()}/>) */
