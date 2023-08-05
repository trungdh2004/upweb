export const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CARD_ITEMS: 'SET_CARD_ITEMS',
    SET_CARD_SHOW: 'SET_CARD_SHOW',
    SET_UP_QTY: 'SET_UP_QTY',
    SET_DOWN_QTY: 'SET_DOWN_QTY',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_FOOD_ITEMS:
            const item = { ...state, foodItems: action.foodItems };

            return item;
        case actionType.SET_CARD_ITEMS:
            const cart = { ...state, cartItems: action.cardItems };
            localStorage.setItem('cart', JSON.stringify(cart.cartItems));
            return cart;
        case actionType.SET_CARD_SHOW:
            return { ...state, cartShow: action.cartShow };
        case actionType.SET_DOWN_QTY:
            let indexDown = state.cartItems.findIndex((item) => {
                return item.id === action.itemQty.id;
            });
            let qtyDown = action.itemQty.qty;
            if (qtyDown > 1) {
                state.cartItems[indexDown].qty = --qtyDown;
            }
            return { ...state };

        case actionType.SET_UP_QTY:
            let indexUp = state.cartItems.findIndex((item) => {
                return item.id === action.itemQty.id;
            });
            let qty = action.itemQty.qty;
            state.cartItems[indexUp].qty = ++qty;
            return { ...state };

        default:
            return state;
    }
};

export default reducer;
