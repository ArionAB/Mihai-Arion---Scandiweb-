import { selectCurrency } from "./currency.actions";
import { CurrencyActionTypes } from "./currency.types";

const INITIAL_STATE = {
  currency: 1,
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrencyActionTypes.SELECT_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};

export default currencyReducer;
