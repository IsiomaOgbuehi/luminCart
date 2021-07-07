import cookie from 'js-cookie';

type Icurrency = string;

export function setCookieCurrency(currency: Icurrency) {
    cookie.set("currency", currency, { expires: 7, sameSite: 'None', secure: true  });
    return localStorage.setItem('currency', JSON.stringify(currency))
}

export function getCookieCurrency() {

    if (typeof window !== 'undefined'){
        const items = localStorage.getItem('currency') || '';
        return items !== '' ? JSON.parse(items) :  '';
    }
    else{
    const currency: any = cookie.get("currency");
    return currency;
    }
}