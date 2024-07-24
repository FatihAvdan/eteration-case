import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartItem} from '../../types/CartItem';

interface CartState {
  items: CartItem[]; // Birden fazla ürün için dizi
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {setCartItems, removeCartItem, clearCart} = cartSlice.actions;
export const selectCartItems = (state: {cart: CartState}) => state.cart.items;
export const selectCartItemLenght = (state: {cart: CartState}) => {
  const items = state.cart.items;
  return items.length;
};

export default cartSlice.reducer;
