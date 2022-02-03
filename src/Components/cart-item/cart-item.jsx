import React, { Component } from "react";
import { connect } from "react-redux";

import { addItem, removeItem } from "../../Redux/Cart/cart.actions";
import CartGallery from "../CartGallery/CartGallery";

import "./cart-item.styles.scss";

class CartItem extends Component {
  someF() {
    const { item } = this.props;
    console.log(item.savedAttr[0].savedAttributes[0]);

    // console.log(item);
    // // item.savedAttr[0]?.item.attributes[0].items.find((test) =>
    // //   item.savedAttr[0]?.savedAttributes.every((e, i) => console.log(e.id))
    // );
    // all attributes console.log(test) __typename: 'Attribute', displayValue: '40', value: '40', id: '40'}displayValue: "40"id: "40"value: "40"

    /*      test.items.map((attributes) =>
        item.savedAttr[0]?.savedAttributes.every((e, i) =>
          console.log(e.attID && e.id === attributes.value)
        )
      ) 
    );  */

    // item.savedAttr[0]?.item.attributes.find((test) =>
    //   test.items.map((attributes) =>
    //     item.savedAttr[0]?.savedAttributes.every((e, i) =>
    //       console.log(e.attID && e.id === attributes.value)
    //     )
    //   )
    // );
  }

  getAttributes() {
    const { item } = this.props;

    //  console.log(item);
    // console.log(item.savedAttr);
    // console.log(item.savedAttr[0]?.item.attributes[0]);
    // console.log(item.savedAttr[0]?.savedAttributes[0]);
    // console.log(item.savedAttr[0].savedAttributes[0].id);

    // item.savedAttr.find((asd) =>
    //   // asd.savedAttributes && asd.savedAttributes[0] {attID: 'Size', nameAtt: 'Size', id: '43', hex: '43'}
    //   asd.savedAttributes?.every((e, i) => console.log(e.asd))
    // );
    // item.find((asd) => asd.savedAttr.every((e, i) => console.log(e.asd)));
    // {attID: 'Size', nameAtt: 'Size', id: '41', hex: '41'} console.log(e, i)
    /*  item.savedAttr[0]?.item.attributes.find((test) => 
      test.items.map((attributes) => console.log(attributes.value)),
      item.savedAttr[0]?.savedAttributes.every((e, i) => e.attID && e.id === attributes.value)
    );
 */

    return item.attributes?.map((att) => {
      const itmVl = item.savedAttr[0]?.savedAttributes.find(
        (itm) => itm.attID === att.id
      );
      return (
        <div className="size-att" key={att.id}>
          {att.items.map((size, index) => {
            return itmVl !== undefined && itmVl.id === size.id ? (
              <button
                key={index}
                className="att-button"
                id={size.value}
                style={
                  size.value.includes("#")
                    ? { background: size.value, color: "transparent" }
                    : {
                        background: "black",
                        color: "white",
                      }
                }
              >
                {size.value}
              </button>
            ) : (
              <button
                key={index}
                style={
                  size.value.includes("#")
                    ? { display: "none" }
                    : { background: "white", color: "black" }
                }
              >
                {size.value}
              </button>
            );
          })}
        </div>
      );
    });
  }

  // <LocalStorage item={item} />

  testTWo() {
    const { item } = this.props;
    const lalala = item.savedAttr.map((lol) => lol);

    console.log(lalala);
    const other = item.savedAttr.find((Cartitem) =>
      Cartitem.savedAttributes.every(
        (e, i) => console.log(e.id)
        // Cartitem.savedAttribute.every(
        //   (e, i) => e.item.value === Cartitem.savedAttribute[i].item.value
        // )
      )
    );
  }

  render() {
    // this.testTWo();
    // this.someF();
    const item = this.props.item;

    const selectCurrency = this.props.selectCurrency;
    const addItem = this.props.addItem;
    const removeItem = this.props.removeItem;

    return (
      <div className="btn-img">
        <div className="name">
          <p>{item.brand}</p>
          <p>{item.name}</p>
          <div className="price-symbol">
            <span>{item.prices[selectCurrency].currency.symbol}</span>
            <p>{item.prices[selectCurrency].amount}</p>
          </div>
          {this.getAttributes()}
        </div>

        <div className="increment">
          <div className="plus-minus">
            <button onClick={() => addItem(item)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => removeItem(item)}>-</button>
          </div>
          <CartGallery image={item.gallery} />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (param) => dispatch(addItem(param)),
  removeItem: (param) => dispatch(removeItem(param)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
