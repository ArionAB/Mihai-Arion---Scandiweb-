import React, { Component } from "react";
import { gql } from "@apollo/client";
import { client } from "../../index";
import { connect } from "react-redux";
import { addItem } from "../../Redux/Cart/cart.actions";

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

    // this.toggleClass = this.toggleClass.bind(this);

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

  /*   toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  } */

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
        <div className="size-att">
          <p className="attribute">{att.name}</p>

          {att.items.map((size, index) => {
            return (
              <button className="att-button" key={index}>
                {size.value}
              </button>
            );
          })}
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

  getPrices() {
    const { item } = this.state;
    return item.prices?.forEach((price) => {
      console.log(price);
      console.log(price.amount);

      return (
        <div>
          <p>{price.amount}</p>
          <p>{price.currency.symbol}</p>
        </div>
      );
    });
  }

  render() {
    const addItem = this.props.addItem;

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
          {this.getAttributes()}
          <div>
            <p>PRICE:</p>
          </div>
          <button className="addCart" onClick={() => addItem(item)}>
            ADD TO CART
          </button>
          <p>{item.description}</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(ProductPage);
