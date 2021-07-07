export function checkStore(cart: any, id: number, action: string) {
    let lower = 0;
    let upper = cart.length;

    while (lower < upper) {

        if (id === cart[lower].id) {
            if (action === 'add'){
                cart[lower].qty = cart[lower].qty + 1;
            } else {
                cart[lower].qty = cart[lower].qty - 1;
                if (cart[lower].qty === 0) {
                    cart.splice(lower, 1);
                }
            }
            return cart;
        }

        lower = lower + 1;
        
    }
    return [];
}