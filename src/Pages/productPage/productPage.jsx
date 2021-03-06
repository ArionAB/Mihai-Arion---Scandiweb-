import React, { Component } from "react";

import { client } from "../../index";
import { connect } from "react-redux";
import { addItem } from "../../Redux/Cart/cart.actions";

import { GET_PRODUCT } from "../../GraphQL/queries";

import "./productPage.styles.scss";

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
              return (savedAttributes[0]?.attID === att.id &&
                savedAttributes[0].id === size.id) ||
                (savedAttributes[1]?.attID === att.id &&
                  savedAttributes[1]?.id === size.id) ||
                (savedAttributes[2]?.attID === att.id &&
                  savedAttributes[2]?.id === size.id) ? (
                <button
                  value={size.value}
                  style={{ background: size.value, color: size.value }}
                  className="is-active"
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
              ) : (
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
        <p className="tot-prc">{amount}</p>
      </div>
    );
  }

  SendAttributeToItem() {
    const { cartItems } = this.props;
    const { savedAttributes, item } = this.state;

    const chosen = { savedAttributes, item };

    // eslint-disable-next-line array-callback-return
    cartItems.map((cartItem) => {
      cartItem.savedAttr?.push(chosen);
    });
  }

  render() {
    this.SendAttributeToItem();
    const addItem = this.props.addItem;

    const { savedAttributes, errors, item, index } = this.state;

    const newItem = Object.assign(savedAttributes, item);

    const attributesLength = item.attributes ? item.attributes.length : "";

    const gallery = item.gallery;

    const newObj = Object.assign({}, gallery);

    function sort_by_key(array, key) {
      return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }

    const addNewItem = (item) => {
      let tempAttributes = [];
      let i = 0;
      while (true) {
        if (item[i]) {
          tempAttributes.push(item[i]);
        } else {
          break;
        }
        i++;
      }

      let sortedAttributes = sort_by_key(tempAttributes, "attID");

      addItem({ ...item, ...sortedAttributes });
    };

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
              onClick={() => {
                if (attributesLength === 0) {
                  savedAttributes.push("attribute") && addNewItem(newItem);
                } else if (
                  savedAttributes.length === attributesLength ||
                  savedAttributes.length > attributesLength
                ) {
                  addNewItem(newItem);
                } else if (
                  savedAttributes.length !== attributesLength ||
                  savedAttributes.length < attributesLength
                ) {
                  this.setState({
                    errors: `Please choose ${attributesLength} attributes.`,
                  });
                }
              }}
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
});

const mapStateToProps = ({ current: { currency }, cart: { cartItems } }) => ({
  selectCurrency: currency,
  cartItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
