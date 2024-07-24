import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import selectedProductReducer from './slices/selectedProductSlice';
import cartReducer from './slices/cartSlice';
const store = configureStore({
  reducer: {
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
