import { getInclusionDirectives } from "@apollo/client/utilities";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import leftArrow from "../../Assets/left-arrow-svgrepo-com.svg";
import { ReactComponent as rightArrow } from "../../Assets/right-arrow-svgrepo-com.svg";
import { addItem, removeItem } from "../../Redux/Cart/cart.actions";
import "./cart-item.styles.scss";

class CartItem extends Component {
  getAttributes() {
    const item = this.props.item;
    console.log(item[0].nameAtt == "Color");
    return item.attributes?.map((att) => {
      return (
        <div className="size-att">
          {att.items.map((size, index) => {
            // console.log(item[1].hex.includes("#") || item[0].hex.includes("#"));
            /*       console.log(item[1].hex);
            console.log(size.value);
            if (item[1].hex == size.value || item[0].hex == size.value) {
              console.log("is a color");
            } else console.log("not a color"); */
            // console.log(item[1].hex !== size.value);
            // console.log(item[1].nameAtt);
            // console.log(
            //   item[0].hex !== size.value &&
            //     item[0].nameAtt == "Color" &&
            //     item[0].hex.includes("#")
            // );
            console.log(item[0].id === size.id || item[1]?.id === size.id);
            return item[0].id === size.id || item[1]?.id === size.id ? (
              <button
                className="att-button"
                id={size.value}
                style={
                  size.value.includes("#")
                    ? { background: size.value, color: size.value }
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

        /*      <div className="size-att">
          {att.items.map((size, index) => {
            return item[0].id === size.id || item[1]?.id === size.id ? (
           
              <button
                className="att-button"
                key={index}
                style={{
                  background: "black",
                  color: "white",
                }}
              >
                {size.value}
              </button>
            
            ) : (
              <button
                className="att-button"
                key={index}
                style={{ background: size.value, color: size.value }}
              >
                {size.value}
              </button>
            );
          })}
        </div> */

        /*   <button
        className={
          "att-button" + (item[0].nameAtt !== "Color")
            ? "att-btn-hidden"
            : "att-button"
        }
        key={index}
        style={{ background: size.value, color: size.value }}
      >
        {size.value}
      </button> */

        /* <div className="size-att">
          {att.items.map((size, index) => {
            console.log(size.id);
            return item[0].id === size.id || item[1].id === size.id ? (
              // item[1].id === size.id ||
              // item[2].id === size.id
              <button
                className="att-button"
                key={index}
                style={{
                  background: "black",
                  color: "white",
                }}
              >
                {size.value}
              </button>
            ) : (
              <button
                className="att-button"
                key={index}
                style={{ background: size.value, color: size.value }}
              >
                {size.value}
              </button>
            );
          })}
        </div>  */
        /*  return (
        <div className="size-att">
          {att.items.map((size, index) => {
            return item[0].id === size.id ||
              item[1].id === size.id ||
              item[2].id === size.id ? (
              <button
                className="att-button"
                key={index}
                style={{
                  background: "black",
                  color: "white",
                }}
              >
                {size.value}
              </button>
            ) : (
              <button
                className="att-button"
                key={index}
                background={size.value}
              >
                {size.value}
              </button>
            );
          })}
        </div> */
      );
    });
  }
  /*   return (
    <div className="size-att">
      {att.items.map((size, index) => {
        console.log(size.id);
        return item[0].id === size.id ||
          item[1].id === size.id ||
          item[2].id === size.id ? (
          <button
            className="att-button"
            key={index}
            style={{
              background: "black",
              color: "white",
            }}
          >
            {size.value}
          </button>
        ) : (
          <button
            className="att-button"
            key={index}
            style={{ background: size.value, color: size.value }}
          >
            {size.value}
          </button>
        );
      })}
    </div>
  ); */
  render() {
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

          <img className="cart-img" src={item.gallery} />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (cacat) => dispatch(addItem(cacat)),
  removeItem: (item) => dispatch(removeItem(item)),
});

const mapStateToProps = ({ current: { currency } }) => ({
  selectCurrency: currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

//  <div className="size-att">
// {att.items.map((size, index) => {
//   console.log(item[1].hex.includes("#") || item[0].hex.includes("#"));
/*       console.log(item[1].hex);
  console.log(size.value);
  if (item[1].hex == size.value || item[0].hex == size.value) {
    console.log("is a color");
  } else console.log("not a color"); */
// console.log(item[1].hex !== size.value);
// console.log(item[1].nameAtt);
// console.log(
//   item[0].hex !== size.value &&
//     item[0].nameAtt == "Color" &&
//     item[0].hex.includes("#")
// );

//   return item[0].id === size.id ||
//     (item[1]?.id === size.id && item[1].hex.includes("#")) ||
//     item[0].hex.includes("#") ? (
//     <button
//       className="att-button"
//       id={item[0].hex}
//       style={
//         item[1].hex.includes("#") || item[0].hex.includes("#")
//           ? { background: "black", color: "white" }
//           : { background: size.value, color: size.value }
//       }
//     >
//       {size.value}
//     </button>
//   ) : (
//     <button
//       className="add-btn-hidden"
//       id={size.value}
//       style={
//         size.value.includes("#")
//           ? { display: "none" }
//           : { background: "white", color: "black" }
//       }
//     >
//       {size.value}
//     </button>
//   );
// })}
// </div>
