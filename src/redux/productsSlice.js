import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    shoppingList: [],
    loadingStatus: "initial",
  },
  reducers: {
    loadProducts: (state, value) => {
      state.productsList = value.payload;
    },
    loadShoppingList: (state, value) => {
      state.shoppingList = value.payload;
    },
    // addToShoppingList: (state, value) => {
    //   state.shoppingList.push(value.payload);
    // },
    setProductLoadingState: (state, value) => {
      state.loadingStatus = value.payload;
    },
  },
});

export const { loadProducts, loadShoppingList, setProductLoadingState } =
  productsSlice.actions;

export default productsSlice.reducer;
