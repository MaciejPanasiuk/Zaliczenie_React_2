import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    filteredProducts: [],
    shoppingList: [],
    searchFilter: "",
    foodOnly: false,
    loadingStatus: "initial",
  },
  reducers: {
    loadProducts: (state, value) => {
      state.productsList = value.payload;
    },
    loadShoppingList: (state, value) => {
      state.shoppingList = value.payload;
    },
    filterProducts: (state, value) => {
      state.searchFilter = value.payload;
      state.filteredProducts = state.productsList.filter((product) =>
        product.name.startsWith(state.searchFilter)
      );
      if (state.foodOnly) {
        state.filteredProducts = state.filteredProducts.filter(
          (product) => product.isFood === state.foodOnly
        );
      }
    },
    showOnlyFood: (state, value) => {
      state.foodOnly = value.payload;
    },
    setProductLoadingState: (state, value) => {
      state.loadingStatus = value.payload;
    },
  },
});

export const {
  loadProducts,
  loadShoppingList,
  filterProducts,
  showOnlyFood,
  setProductLoadingState,
} = productsSlice.actions;

export default productsSlice.reducer;
