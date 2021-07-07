import { cartTotalType } from "../constants/constants";

export const cartTotalAction = (total: number) => {
    return {
        type: cartTotalType.CART_TOTAL,
        payload: total
    }
}