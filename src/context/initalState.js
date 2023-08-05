import { fetchUser, fetchCart } from '../utils/ferchLocalStorageData';

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
    user: userInfo,
    foodItems: [],
    cartShow: false,
    cartItems: cartInfo,
};
