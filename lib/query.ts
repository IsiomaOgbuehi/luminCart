
import { gql } from "@apollo/client";
import { currencyType } from "./currencyEnum";


export const apiProductGql = (currency: currencyType) => {
    
    return (
        gql`
        query products{
        products{
            id
            title
            price(currency: ${currency})
            image_url
            product_options{
            title
            prefix
            suffix
            options{
                id
                value
            }
            }
        }
}`
    );
}

export const apiCurrencyGql = gql`
    query currency{
    currency
    }
`