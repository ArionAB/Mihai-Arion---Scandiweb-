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
      errors: "",
      savedAttributes: [],
      attributeName: "",
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

  getAttributeName() {
    const { item } = this.state;
    const { attributeName } = this.state;

    if (attributeName.length > 0) return;
    else
      return item.attributes?.map((att) => {
        this.setState({ attributeName: att.name });
      });
  }

  /*   noAttributes() {
    const {item} = this.state
    const { savedAttributes } = this.state;
    const { attributeName } = this.state;
    if (attributeName.length > 1) return;
    else if (savedAttributes.length == 0) {
      this.setState({ savedAttributes: "a" });
    }
  } */

  /*   noAttributes() {
    const { item } = this.state;
    const { savedAttributes } = this.state;
    const { attributeName } = this.state;
    if (!item.attributes.length ? item.attributes.length : "") {
      alert("No items");
    }
  } */
  // if (item.attributes !== undefined) return;
  // else return this.setState({ savedAttributes: "a" });

  getAttributes() {
    const { item } = this.state;

    return item.attributes?.map((att) => {
      return (
        <div>
          <p className="attribute">{att.name}</p>

          <div className="att-btn">
            {att.items.map((size, index) => {
              return (
                <button
                  className="att-button"
                  key={index}
                  onClick={() =>
                    this.setState({
                      savedAttributes: size.value,
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
    return item.prices?.forEach((price) => {
      // console.log(price);
      console.log(price.currency.label);

      return (
        <div>
          <p>{price.amount}</p>
          <p>{price.currency.symbol}</p>
        </div>
      );
    });
  }

  render() {
    this.getPrices();
    this.getAttributeName();

    const addItem = this.props.addItem;
    const { savedAttributes } = this.state;

    const { attributeName } = this.state;
    const { errors } = this.state;

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
          <div className={errors ? "hasErrors" : ""}>{errors}</div>
          <button
            className="addCart"
            onClick={
              () =>
                savedAttributes.length > 0
                  ? addItem(item)
                  : this.setState({
                      errors: `Please choose a ${attributeName}`,
                    })
              // : alert(`Please choose a ${attributeName}.`)
            }
          >
            ADD TO CART
          </button>

          <p>{item.description}</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (cacat) => dispatch(addItem(cacat)),
});

export default connect(null, mapDispatchToProps)(ProductPage);

/* <button className="addCart" onClick={() => addItem(item)}>
ADD TO CART
</button> */
