import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartItem} from '../../types/CartItem';

type QuantityType = {
  id: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// AsyncStorage'dan veriyi al ve Redux state'ine yükle
export const loadCartFromStorage = createAsyncThunk(
  'cart/loadFromStorage',
  async () => {
    const storedCart = await AsyncStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  },
);

// AsyncStorage'a veriyi kaydet
export const saveCartToStorage = createAsyncThunk(
  'cart/saveToStorage',
  async (items: CartItem[]) => {
    await AsyncStorage.setItem('cartItems', JSON.stringify(items));
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
    },
    changeQuantity: (state, action: PayloadAction<QuantityType>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        if (action.payload.quantity > 0) {
          existingItem.quantity = action.payload.quantity;
        } else {
          state.items = state.items.filter(
            item => item.id !== action.payload.id,
          );
        }
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCartFromStorage.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveCartToStorage.fulfilled, () => {
        // No state change needed
      });
  },
});

export const {
  setCartItems,
  removeCartItem,
  clearCart,
  addCartItem,
  changeQuantity,
} = cartSlice.actions;

export const selectCartItems = (state: {cart: CartState}) => state.cart.items;
export const selectCartItemLength = (state: {cart: CartState}) =>
  state.cart.items.length;

export default cartSlice.reducer;
