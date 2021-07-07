import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { currencyReducer } from "./currencyReducer";
import { cartTotalReducer } from "./cartTotalReducer";

const reducers = combineReducers({
  products: productReducer,
  currency: currencyReducer,
  total: cartTotalReducer
});

export default reducers;