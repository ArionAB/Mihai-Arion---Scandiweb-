import { ProductActionTypes } from "./productiID.types";

export const setProdID = (id) => ({
  type: ProductActionTypes.SET_PROD_ID,
  payload: id,
});
