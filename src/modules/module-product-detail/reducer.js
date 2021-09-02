import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteProductDetail } from "./fetchAPI";

const initialState = {
  value: {},
  status: "loading",
};

export const fetchProductDetail = createAsyncThunk(
  "productDetail/fetchProductDetail",
  async (productId) => {
    const response = await fetchRemoteProductDetail(productId);
    return response.data;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload.data;
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const selectData = (state) => state.productDetail.value;
export const selectStatus = (state) => state.productDetail.status;

export default productDetailSlice.reducer;
