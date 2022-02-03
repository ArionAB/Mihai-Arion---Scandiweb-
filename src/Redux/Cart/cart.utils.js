import cartItem from "../../Components/cart-item/cart-item";
import { addAttribute } from "./cart.actions";

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  const something = cartItems.find((item) =>
    item.savedAttr[0]?.savedAttributes.every(
      (e, i) => e.id === item.savedAttr[0].savedAttributes[i].id
    )
  );

  if (existingCartItem && something) {
    return cartItems.map((cartItem) =>
      cartItem.savedAttr[0]?.savedAttributes.every(
        (e, i) => e.id === cartItemToAdd.savedAttr[0].savedAttributes[i].id
      )
        ? { ...cartItem, quantity: cartItem.quantity + 1, savedAttr: [] }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
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
};

/*  const other = cartItems.find((item) =>
  item.savedAttribute.every(
    (e, i) => e.item.value === cartItemToAdd.savedAttribute[i].item.value
  )
); */

/*   const other = cartItems.find((asd)=>
  asd.savedAttr.every(
    (e, i) => e.asd.value === asd.savedAttributes[i].asd.value
  )
  ) */
