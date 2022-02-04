import cartItem from "../../Components/cart-item/cart-item";
import { addAttribute } from "./cart.actions";

export const addItemToCart = (cartItems, cartItemToAdd) => {
  console.log(cartItemToAdd);
  console.log(cartItemToAdd[0].id);
  //selected attribute ID

  if (cartItemToAdd[0]) {
    const match = cartItems.find(
      (cartItem) =>
        cartItem.id === cartItemToAdd.id &&
        cartItem[0].id === cartItemToAdd[0].id
      //TRUE cartItem.id == cartItemToAdd.id
    );

    const other = cartItems.find((item) =>
      item.savedAttr.find((Cartitem) =>
        Cartitem.savedAttributes.every(
          (e, i) => e.id == cartItemToAdd[i].id
          //TRUE e.id === cartItemToAdd[i].id
        )
      )
    );
    console.log("read me");
    if (match) {
      console.log("other & match");
      return cartItems.map((cartItem) =>
        cartItem.id == cartItemToAdd.id &&
        cartItem[0].id === cartItemToAdd[0].id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      /*   cartItems.map((cartItem) =>
        cartItem.id == cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ); */
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1, savedAttr: [] }];
  } else {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id == cartItemToAdd.id
    );

    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id == cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1, savedAttr: [] }];
  }
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === cartItemToRemove.id &&
      cartItem[0].id === cartItemToRemove[0].id
  );

  console.log("exitsting", existingCartItem);
  if (existingCartItem.quantity === 1) {
    console.log("if con.", cartItemToRemove[0].id);
    console.log("cart items", cartItems);
    let data = [];
    cartItems.map((cartItem) => {
      if (cartItem.id !== cartItemToRemove.id) {
        data.push(cartItem);
      } else if (
        cartItem.id === cartItemToRemove.id &&
        cartItem[0].id !== cartItemToRemove[0].id
      ) {
        data.push(cartItem);
      }
    });

    return data;
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id &&
    cartItem[0].id === cartItemToRemove[0].id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};

/* export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};  */
