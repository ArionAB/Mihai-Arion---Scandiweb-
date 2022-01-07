import { combineReducers } from "redux";

import { idReducer } from "./productID/productID.reducer";

export default combineReducers({
  product: idReducer,
});
