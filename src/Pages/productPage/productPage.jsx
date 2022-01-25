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
    this.attChange = this.attChange.bind(this);
    this.isAttrActive = this.isAttrActive.bind(this);
    this.YoutubeHandleChange = this.YoutubeHandleChange.bind(this);
  }

  isAttrActive(selectAttribute, chosenAttributes) {
    return Boolean(
      chosenAttributes.find(
        (i) =>
          i.id === selectAttribute.id && i.item?.id === selectAttribute.item.id
      )
    );
  }

  componentDidMount() {
    this.getProduct();
  }

  /*   handleSavedAtt = (e) => {
    this.setState([...this.state.savedAttributes], this.state.savedAttributes);
  }; */

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

  getAttributeName() {
    const { item, attributeName } = this.state;

    if (attributeName.length > 0) return;
    else
      return item.attributes?.map((att) => {
        this.setState({ attributeName: att.name });
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  attChange(e) {
    const value = this.state.value;

    this.setState({ value: e.target.value });
    // console.log(e.target.value);
    // console.log(value);
  }

  saveAttribute(attr) {
    const { attr: attribute, itemID } = attr;
    const { item } = this.state;
    this.props.change(attribute, item[itemID]);
  }

  /*   getAttributes() {
    const { item, savedAttributes, value } = this.state;
    console.log(value);
    return item.attributes?.map((att, index) => {
      const { items, type, id, name } = att;
      return (
        <div key={index}>
          <p className="attribute">{name}</p>

          <div className="att-btn">
            {items.map((size, index) => {
              const selectAttribute = {
                id,
                name,
                type,
                item: size,
              };
              console.log(size);

              return (
                <button
                  key={size.id}
                  
                  style={{ background: size.value, color: size.value }}
                  className="att-button"
                  
                  onClick={() =>
                    this.saveAttribute({  index, attr: selectAttribute })
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
  } */

  YoutubeHandleChange = (e) => {
    /*  const { item } = this.state;
    const { name, value } = item || {};
    /*  const { formData } = this.state;
    const updatedState = {
      ...formData,
      [name]: value,
    };
    this.setState({ formData: updatedState }); */
    // console.log(item); */
  };

  /*  getAttributes() {
    const { item, savedAttributes, formData } = this.state;
    return item.attributes?.map((att) => {
      console.log(att);
      return (
        <div>
          <p className="attribute" key={att.id}>
            {att.name}
          </p>

          <div className="att-btn">
            {att.items.map((size, index) => {
              console.log(size);
              return (
                <button
                  name={size.displayValue}
                  value={formData[size.displayValue]}
                  style={{ background: size.value, color: size.value }}
                  className="att-button"
                  key={size.id}
                  onClick={(e) => this.YoutubeHandleChange(e)}
                ></button>
              );
            })}
          </div>
        </div>
      );
    });
  } */

  /*   getAttributes() {
    const { item, savedAttributes, value } = this.state;
    console.log(value);
    return item.attributes?.map((att) => {
      return (
        <div>
          <p className="attribute">{att.name}</p>

          <div className="att-btn">
            {att.items.map((size, index) => {
              console.log(size);
              size.value === value
                ? console.log("equal")
                : console.log("not equal");

              return (
                <button
                  name={size.value}
                  value={size.value}
                  style={{ background: size.value, color: size.value }}
                  className="att-button"
                  key={index}
                  onClick={
                    (e) => this.attChange(e)
                    /*      this.setState({
                        savedAttributes: [...savedAttributes, size.value],

                        errors: "",
                      }) */
  // }
  //               >
  //                 {size.value}
  //               </button>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     );
  //   });*/
  // }

  filterAttributes() {
    const { savedAttributes } = this.state;
    return savedAttributes.map((saved) => {
      console.log(saved);
    });
    /*     console.log(savedAttributes);
    console.log(savedAttributes[0]);
    console.log(savedAttributes[1]);
    console.log(savedAttributes[2]); */
  }

  getAttributes() {
    const { item, savedAttributes } = this.state;
    return item.attributes?.map((att) => {
      const nameAtt = att.name;
      return (
        <div>
          <p className="attribute">{att.name}</p>

          <div className="att-btn">
            {att.items.map((size, index) => {
              const id = size.id;
              return (
                <button
                  value={size.value}
                  style={{ background: size.value, color: size.value }}
                  className="att-button"
                  key={index}
                  onClick={() =>
                    this.setState({
                      savedAttributes: [...savedAttributes, { nameAtt, id }],
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
    this.getAttributeName();
    this.filterAttributes();
    const addItem = this.props.addItem;
    const { savedAttributes, attributeName, errors, item, index, value } =
      this.state;

    const addAttribute = this.props.addAttribute;

    // const newItem = item.push(savedAttributes);
    // console.log(newItem);
    console.log(savedAttributes);
    console.log(item);

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
            <p>PRICE:</p>
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
