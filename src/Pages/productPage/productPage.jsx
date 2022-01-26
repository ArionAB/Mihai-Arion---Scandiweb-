import React, { Component } from "react";
import { gql } from "@apollo/client";
import { client } from "../../index";
import { connect } from "react-redux";
import { addItem } from "../../Redux/Cart/cart.actions";
import { addAttribute } from "../../Redux/Cart/cart.actions";

import "./productPage.styles.scss";
import { addItemToCart } from "../../Redux/Cart/cart.utils";

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

    this.state = {
      item: {},
      errors: "",
      savedAttributes: [],
      attributeName: "",
      prices: [],
      index: 0,
      value: [],
      formData: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getProduct();
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

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  getAttributes() {
    const { item, savedAttributes } = this.state;
    return item.attributes?.map((att, index) => {
      const nameAtt = att.name;
      return (
        <div key={index}>
          <p className="attribute">{att.name}:</p>

          <div className="att-btn">
            {att.items.map((size, index) => {
              const hex = size.value;
              const id = size.id;
              return (
                <button
                  value={size.value}
                  style={{ background: size.value, color: size.value }}
                  className="att-button"
                  key={index}
                  onClick={() =>
                    this.setState({
                      savedAttributes: [
                        ...savedAttributes,
                        { nameAtt, id, hex },
                      ],
                      errors: "",
                    })
                  }
                >
                  {size.value}
                </button>
              );
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
        <div className="thumb" key={index}>
          <img
            onClick={() => this.handleTab(index)}
            src={entry[1]}
            alt=""
          ></img>
        </div>
      );
    });
  }

  getPrices() {
    const { item } = this.state;
    const selectCurrency = this.props.selectCurrency;
    const amount = item.prices ? item.prices[selectCurrency].amount : "";
    const symbol = item.prices
      ? item.prices[selectCurrency].currency.symbol
      : "";

    return (
      <div className="symbol-amount">
        <p>{symbol}</p>
        <p>{amount}</p>
      </div>
    );
  }

  render() {
    const addItem = this.props.addItem;
    const { savedAttributes, errors, item, index, value } = this.state;

    const newItem = Object.assign(savedAttributes, item);
    console.log(newItem);
    const attributesLength = item.attributes ? item.attributes.length : "";

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
            <p className="product-price">PRICE:</p>
            {this.getPrices()}
          </div>
          <div className={errors ? "hasErrors" : ""}>{errors}</div>
          {item.inStock ? (
            <button
              className="addCart"
              onClick={() =>
                savedAttributes.length === attributesLength ||
                savedAttributes.length > attributesLength
                  ? addItem(newItem)
                  : this.setState({
                      errors: `Please choose  ${attributesLength} attributes.`,
                    })
              }
            >
              ADD TO CART
            </button>
          ) : (
            <div>
              <button className="no-stock">Out of Stock</button>
            </div>
          )}

          <div
            className="parsedHTML"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (cacat) => dispatch(addItem(cacat)),
  addAttribute: (cacat) => dispatch(addAttribute(cacat)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
