import { configureStore } from "@reduxjs/toolkit";
import productDetailSlice from "modules/module-product-detail/reducer";
import productsSlice from "modules/module-product/reducer";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    productDetail: productDetailSlice,
  },
});
