import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  items: string[];
}

const initialState: FavoritesState = {
  items: [],
};

export const loadFavoritesFromStorage = createAsyncThunk(
  'favorites/loadFromStorage',
  async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  },
);

// AsyncStorage'a veriyi kaydet
export const saveFavoritesToStorage = createAsyncThunk(
  'favorites/saveToStorage',
  async (items: string[]) => {
    await AsyncStorage.setItem('favorites', JSON.stringify(items));
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavoriteItems: (state, action: PayloadAction<string>) => {
      state.items = [...state.items, action.payload];
    },
    removeFavoriteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavoritesFromStorage.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveFavoritesToStorage.fulfilled, () => {
        // No state change needed
      });
  },
});

export const {addToFavoriteItems, removeFavoriteItem} = favoritesSlice.actions;

export const selectFavoriteItems = (state: {favorites: FavoritesState}) =>
  state.favorites.items;

export default favoritesSlice.reducer;
