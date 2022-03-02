import { UserActionTypes } from "./user.types";

export const currentUser = (user) => ({
  type: UserActionTypes.CURRENT_USER,
  payload: user,
});
