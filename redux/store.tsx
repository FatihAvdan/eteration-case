import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import selectedProductReducer from './slices/selectedProductSlice';
import cartReducer, {loadCartFromStorage} from './slices/cartSlice';
import favoritesReducer, {
  loadFavoritesFromStorage,
} from './slices/favoritesSlice';
import filterReducer from './slices/filterSlice';
const store = configureStore({
  reducer: {
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});
store.dispatch(loadFavoritesFromStorage());
store.dispatch(loadCartFromStorage());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
