import { productActionType } from "../constants/constants";
import { productsType } from "../types/actiontypes";
import { Product } from "../../components/products/type";

const initialProduct = {
  all: {},
  active: [],
  currencies: [],
  cart: [] as unknown as [Product],
};

interface stateObject {
  [key: string]: any;
}

export const productReducer = (
  state = initialProduct,
  { type, payload }: productsType
) => {
  switch (type) {
    case productActionType.PRODUCTS_GET_ALL:
      const payloadkey = Object.keys(payload)[0];
      const payloadval = Object.values(payload)[0];

      let obj: stateObject = {};
      if (state.all) {
        const data = state.all;
        let stateKeys = Object.keys(data);
        let stateValues = Object.values(data);

        stateKeys.push(payloadkey);
        stateValues.push(payloadval);

        for (let i = 0; i < stateKeys.length; i++) {
          obj[stateKeys[i]] = stateValues[i];
        }
      } else {
        obj = payload;
      }

      return { ...state, all: obj };

    case productActionType.ACTIVE_PRODUCT:
      return { ...state, active: payload };

    case productActionType.PRODUCT_CURRENCIES:
      return { ...state, currencies: payload };

    case productActionType.CART_ITEMS:
      return { ...state, cart: payload };

    default:
      return state;
  }
};
