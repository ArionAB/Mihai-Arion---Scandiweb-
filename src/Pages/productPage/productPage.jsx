import React, { Component } from "react";

import { client } from "../../index";
import { connect } from "react-redux";
import { addItem } from "../../Redux/Cart/cart.actions";
import { addAttribute } from "../../Redux/Cart/cart.actions";
import { GET_PRODUCT } from "../../GraphQL/queries";

import "./productPage.styles.scss";
import CartItem from "../../Components/cart-item/cart-item";

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      errors: "",
      savedAttributes: [],
      index: 0,
      value: [],
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
      const attID = att.id;
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
                  onClick={() => {
                    const ind = savedAttributes.findIndex(
                      (itm) => itm.attID === attID
                    );

                    if (ind !== -1) {
                      savedAttributes.splice(ind, 1);
                    }
                    return this.setState({
                      savedAttributes: [
                        ...savedAttributes,

                        { attID, nameAtt, id, hex },
                      ],
                      attIDstate: attID,
                      errors: "",
                    });
                  }}
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

  SendAttributeToItem() {
    const { savedAttributes } = this.state;
    console.log(savedAttributes);
    return <CartItem savedItem={savedAttributes} />;

    /*  savedAttributes.map((savedItem) => {
      console.log("savedItem", savedItem);
      const entries = Object.entries(savedItem);
      const save = [entries, entries];
      console.log("save", save);
    }); */
  }

  render() {
    this.SendAttributeToItem();
    const addItem = this.props.addItem;
    const addAttribute = this.props.addAttribute;
    const { savedAttributes, errors, item, index } = this.state;

    const newItem = Object.assign(savedAttributes, item);
    const chosenAttributes = { savedAttributes, item };
    // console.log(newItem);
    // console.log(chosenAttributes.savedAttributes);
    addAttribute(chosenAttributes);

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
  addItem: (param) => dispatch(addItem(param)),
  addAttribute: (param) => dispatch(addAttribute(param)),
});

const mapStateToProps = ({ current: { currency }, cart: { cartItems } }) => ({
  selectCurrency: currency,
  cartItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
