import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {productsApi} from '../api/productsApi';
import {ProductApiItem} from '../types/productApi.types';

interface ProductsState {
  items: ProductApiItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',

  async (page: number) => {
    return await productsApi.getProducts(page);
  },
);

const productsSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;