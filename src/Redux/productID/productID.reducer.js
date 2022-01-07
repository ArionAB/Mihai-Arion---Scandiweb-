const INITIAL_STATE = {
  prodID: null,
};

export const idReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PROD_ID":
      return {
        ...state,
        prodID: action.payload,
      };

    default:
      return state;
  }
};
