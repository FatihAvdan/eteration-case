import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Filter} from '../../types/Filter';
import {RootState} from '../store';

interface FilterState {
  filter: Filter;
}

const initialState: FilterState = {
  filter: {
    sort: 'oldToNew',
    brand: [],
    model: [],
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterSort: (state, action: PayloadAction<string>) => {
      state.filter.sort = action.payload;
    },
    setFilterBrand: (state, action: PayloadAction<string[]>) => {
      state.filter.brand = action.payload;
    },
    setFilterModel: (state, action: PayloadAction<string[]>) => {
      state.filter.model = action.payload;
    },
  },
});

export const {setFilterSort, setFilterBrand, setFilterModel} =
  filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter.filter;
export default filterSlice.reducer;
