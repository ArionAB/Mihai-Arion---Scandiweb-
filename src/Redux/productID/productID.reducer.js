import { ProductActionTypes } from "./productiID.types";

const INITIAL_STATE = {
  prodID: null,
};

export const idReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_PROD_ID:
      return {
        ...state,
        prodID: action.payload,
      };

    default:
      return state;
  }
};
