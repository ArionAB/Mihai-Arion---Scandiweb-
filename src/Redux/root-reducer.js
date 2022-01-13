import { combineReducers } from "redux";

import cartReducer from "./Cart/cart.reducer";

export default combineReducers({
  cart: cartReducer,
});
