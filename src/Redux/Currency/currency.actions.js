import { CurrencyActionTypes } from "./currency.types";
import { PriceActionTypes } from "./currency.types";

export const selectCurrency = (currency) => ({
  type: CurrencyActionTypes.SELECT_CURRENCY,
  payload: currency,
});

export const setPrice = (price) => ({
  type: PriceActionTypes.SET_PRICE,
  payload: price,
});
