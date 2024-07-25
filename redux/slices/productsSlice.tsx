import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../../types/Product';
import {RootState} from '../store';

interface ProductsState {
  products: Product[];
  displayedProducts: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: ProductsState = {
  products: [],
  displayedProducts: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(
      'https://5fc9346b2af77700165ae514.mockapi.io/products',
    );
    return response.data;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadMoreDisplayedProducts: state => {
      const startIndex = (state.page - 1) * 12;
      const endIndex = state.page * 12;
      const newProducts = state.products.slice(startIndex, endIndex);
      state.displayedProducts = [...state.displayedProducts, ...newProducts];
      state.page += 1;
      state.hasMore = endIndex < state.products.length;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.displayedProducts = action.payload.slice(0, 12);
        state.page = 2; // Next page to load
        state.hasMore = action.payload.length > 12;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

const createMemoizedSelector = (selector: (state: RootState) => any) => {
  let lastResult: any;
  let lastState: RootState;

  return (state: RootState) => {
    if (state === lastState) {
      return lastResult;
    }
    lastState = state;
    lastResult = selector(state);
    return lastResult;
  };
};

export const {loadMoreDisplayedProducts} = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;
export const selectBrands = createMemoizedSelector((state: RootState) =>
  state.products.products.map(product => product.brand),
);

export const selectModels = createMemoizedSelector((state: RootState) =>
  state.products.products.map(product => product.model),
);
export default productsSlice.reducer;
