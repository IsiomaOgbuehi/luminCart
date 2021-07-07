import { productActionType } from "../constants/constants";

export const productAction = (products: Object) => {
    return {
      type: productActionType.PRODUCTS_GET_ALL,
      payload: products,
    };
}

export const activeProduct = (product: []) => {
  return {
    type: productActionType.ACTIVE_PRODUCT,
    payload: product
  }
}

export const currencyAction = (currencies: []) => {
  return {
    type: productActionType.PRODUCT_CURRENCIES,
    payload: currencies
  };
}

export const cartItems = (cart: any) => {
  return {
    type: productActionType.CART_ITEMS,
    payload: cart
  };
}