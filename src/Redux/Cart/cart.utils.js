export const addItemToCart = (cartItems, cartItemToAdd) => {
  if (cartItemToAdd[0]) {
    const match = cartItems.find((cartItem) => {
      return (
        cartItem.id === cartItemToAdd.id &&
        cartItem[0].id === cartItemToAdd[0].id &&
        cartItem[1]?.id === cartItemToAdd[1]?.id &&
        cartItem[2]?.id === cartItemToAdd[2]?.id
      );
    });

    if (match) {
      return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToAdd.id &&
          cartItem[0].id === cartItemToAdd[0].id &&
          cartItem[1]?.id === cartItemToAdd[1]?.id &&
          cartItem[2]?.id === cartItemToAdd[2]?.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem;
      });
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
  if (cartItemToRemove.quantity === 1) {
    let data = [];
    cartItems.map((cartItem) => {
      if (
        cartItem.id === cartItemToRemove.id &&
        cartItem[0].id === cartItemToRemove[0].id &&
        cartItem[1]?.id === cartItemToRemove[1]?.id &&
        cartItem[2]?.id === cartItemToRemove[2]?.id
      ) {
      } else {
        data.push(cartItem);
      }
    });

    return data;
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id &&
      cartItem[0].id === cartItemToRemove[0].id &&
      cartItem[1]?.id === cartItemToRemove[1]?.id &&
      cartItem[2]?.id === cartItemToRemove[2]?.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          }
        : cartItem
    );
  }
};
