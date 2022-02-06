import cartItem from "../../Components/cart-item/cart-item";
import { addAttribute } from "./cart.actions";

export const addItemToCart = (cartItems, cartItemToAdd) => {
  if (cartItemToAdd[0]) {
    const match = cartItems.find(
      (cartItem) =>
        cartItem.id === cartItemToAdd.id &&
        cartItem[0].id === cartItemToAdd[0].id &&
        cartItem[1].id === cartItemToAdd[1].id
    );

    if (match) {
      return cartItems.map((cartItem) =>
        cartItem.id == cartItemToAdd.id &&
        cartItem[0].id === cartItemToAdd[0].id &&
        cartItem[1].id === cartItemToAdd[1].id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
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
    // &&
    // cartItem[1].id === cartItemToRemove[1].id
    // allows me to remove item
  );

  if (existingCartItem.quantity === 1) {
    let data = [];
    cartItems.map((cartItem) => {
      console.log(cartItem.attributes.length);
      if (cartItem.id !== cartItemToRemove.id) {
        data.push(cartItem);
      } else if (
        cartItem.attributes.length === 1 &&
        cartItem.id === cartItemToRemove.id &&
        cartItem[0].id !== cartItemToRemove[0].id
        //this allows me to delete items that have different first attributes
      ) {
        data.push(cartItem);
      } else if (
        cartItem.attributes.length === 2 &&
        cartItem.id === cartItemToRemove.id &&
        cartItem[0].id === cartItemToRemove[0].id &&
        cartItem[1].id !== cartItemToRemove[1].id
      ) {
        data.push(cartItem);
      } else if (
        cartItem.attributes.length === 3 &&
        cartItem.id === cartItemToRemove.id &&
        cartItem[0].id === cartItemToRemove[0].id &&
        cartItem[1].id === cartItemToRemove[1].id &&
        cartItem[2].id !== cartItemToRemove[2].id
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
