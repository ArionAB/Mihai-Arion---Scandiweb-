import { combineReducers } from "redux";

import cartReducer from "./Cart/cart.reducer";
import { currencyReducer } from "./Currency/currency.reducer";

export default combineReducers({
  cart: cartReducer,
  current: currencyReducer,
});
