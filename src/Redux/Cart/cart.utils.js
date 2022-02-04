import cartItem from "../../Components/cart-item/cart-item";
import { addAttribute } from "./cart.actions";

export const addItemToCart = (cartItems, cartItemToAdd) => {
  if (cartItemToAdd[0]) {
    const match = cartItems.find(
      (cartItem) =>
        cartItem.id === cartItemToAdd.id &&
        cartItem[0].id === cartItemToAdd[0].id
    );

    if (match) {
      return cartItems.map((cartItem) =>
        cartItem.id == cartItemToAdd.id &&
        cartItem[0].id === cartItemToAdd[0].id
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
  );

  if (existingCartItem.quantity === 1) {
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
