import { combineReducers } from "redux";

import { idReducer } from "./productID/productID.reducer";
import cartReducer from "./Cart/cart.reducer";

export default combineReducers({
  id: idReducer,
  cart: cartReducer,
});
