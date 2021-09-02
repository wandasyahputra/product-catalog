import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteProduct } from "./fetchAPI";

const initialState = {
  value: [],
  status: "idle",
  lastPage: 0,
  page: 1,
  numOfResults: 20,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page, numOfResult, textSearch }) => {
    const response = await fetchRemoteProduct(page, numOfResult, textSearch);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload.data;
        state.numOfResults = action.payload.numOfResults;
        state.lastPage = action.payload.lastPage;
        state.page = action.payload.page;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const selectData = (state) => state.products.value;
export const selectPage = (state) => state.products.page;
export const selectNumofResult = (state) => state.products.numOfResults;
export const selectLastpage = (state) => state.products.lastPage;
export const selectStatus = (state) => state.products.status;

export default productsSlice.reducer;
