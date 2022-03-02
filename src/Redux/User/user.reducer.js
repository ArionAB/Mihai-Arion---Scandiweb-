import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  user: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
