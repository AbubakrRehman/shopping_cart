

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCTS":
            console.log("added!!!!");
            return { ...state, products:action.payload }
        case "ADD_TO_CART":
            console.log("added!!!!");
            return { ...state, cart: [...state.cart, action.payload] }
        case "REMOVE_FROM_CART":
            console.log("removed!!!!", action.payload);
            return {
                ...state, cart: state.cart.filter((cart_element, index) => {
                    return cart_element.id !== action.payload.id;
                })
            }
        case "CHANGE_CART_QTY":
            return {
                ...state, cart: state.cart.filter((item, index) => {
                    return item.id === action.payload.id ? item.qty = action.payload.qty : item.qty;
                })
            }
        default:
            return state;
    }
}

export default cartReducer;


