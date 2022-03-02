import { CurrencyActionTypes } from "./currency.types";

export const selectCurrency = (currency) => ({
  type: CurrencyActionTypes.SELECT_CURRENCY,
  payload: currency,
});

export const price = (price) => ({
  type: CurrencyActionTypes.PRICE,
  payload: price,
});
