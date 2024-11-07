import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategories: [],
  checkedPrices: [],
};

export const reduxSlice = createSlice({
  name: "redux",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size, color, quantity, category } = action.payload;
      const existingItem = state.products.find(
        (item) =>
          item.id === id &&
          item.size === size &&
          item.color === color &&
          item.category === category
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.products.push(action.payload);
      }
      toast.success("Product added to cart!");
    },

    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      }
    },

    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      } else if (existingItem) {
        toast.error("Minimum quantity is 1.");
      }
    },

    deleteItem: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter(
        (item) => item.id !== id
      );
      toast.error("Product removed from cart");
    },

    resetCart: (state) => {
      state.products = [];
      // toast.success("Cart reset successfully!");
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some((b) => b._id === brand._id);
      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter((b) => b._id !== brand._id);
      } else {
        state.checkedBrands.push(brand);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategories.some((b) => b._id === category._id);
      if (isCategoryChecked) {
        state.checkedCategories = state.checkedCategories.filter((b) => b._id !== category._id);
      } else {
        state.checkedCategories.push(category);
      }
    },

    togglePrice: (state, action) => {
      const priceRange = action.payload;
      const isPriceChecked = state.checkedPrices.some((p) => p._id === priceRange._id);
      if (isPriceChecked) {
        state.checkedPrices = state.checkedPrices.filter((p) => p._id !== priceRange._id);
      } else {
        state.checkedPrices.push(priceRange);
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  toggleBrand,
  toggleCategory,
  togglePrice,
} = reduxSlice.actions;

export default reduxSlice.reducer;
