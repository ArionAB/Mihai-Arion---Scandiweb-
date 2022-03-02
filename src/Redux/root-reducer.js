import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./Cart/cart.reducer";
import { userReducer } from "./User/user.reducer";
import { currencyReducer } from "./Currency/currency.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "current", "userReducer"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  current: currencyReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
