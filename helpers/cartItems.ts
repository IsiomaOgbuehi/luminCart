type Items = [{
    id?: number;
    qty?: number;
}]

export function setCartItems (items : Items) {
    if(!items){
        localStorage.setItem('cartItems', JSON.stringify([]));
    } else {
        localStorage.setItem('cartItems', JSON.stringify(items))
    }
}

export function getCartItems() {
    if (typeof window !== 'undefined'){
    const items = localStorage.getItem('cartItems') || '';
    return items !== '' ? JSON.parse(items) :  [];
    }
}