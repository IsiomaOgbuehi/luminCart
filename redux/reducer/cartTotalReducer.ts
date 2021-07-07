import { cartTotalType as totalAction } from "../constants/constants";
import { cartTotalType } from "../types/cartTotal";

export const cartTotalReducer = (state = 0, {type, payload}: cartTotalType) => {
    switch(type) {
        case totalAction.CART_TOTAL:
            return payload;
        default:
            return state;
    }
}