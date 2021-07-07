import { currencyAction } from '../constants/constants';

export const defaultCurrency = (currency: string) => {
    return {
      type: currencyAction.ACTIVE_CURRENCY,
      payload: currency,
    };
}