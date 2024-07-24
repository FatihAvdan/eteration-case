import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/Product';

interface SelectedProductState {
  selectedProduct: Product | null;
}

const initialState: SelectedProductState = {
  selectedProduct: {
    id: 0,
    name: '',
    price: 0,
    image: '',
    description: '',
  },
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: state => {
      state.selectedProduct = null;
    },
  },
});

export const {setSelectedProduct, clearSelectedProduct} =
  selectedProductSlice.actions;
export const selectSelectedProduct = (state: {
  selectedProduct: SelectedProductState;
}) => state.selectedProduct.selectedProduct;
export default selectedProductSlice.reducer;
