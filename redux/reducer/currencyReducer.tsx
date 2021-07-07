import { currencyAction } from "../constants/constants";
import { currencytype } from '../types/currencyActionType';

export const currencyReducer = (state = "", { type, payload }: currencytype) => {
    switch(type){
        case currencyAction.ACTIVE_CURRENCY:
            return payload;
        default:
            return state;
    }
};