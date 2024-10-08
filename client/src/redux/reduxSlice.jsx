import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
};

export const reduxSlice = createSlice({
  name: "redux",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, size, color, quantity } = action.payload;

      // Check if the product with the same size and color exists
      const existingItem = state.products.find(
        (item) => item._id === _id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity; // Increment quantity for existing variant
      } else {
        state.products.push(action.payload); // Add new variant as new product
      }
      toast.success("Product added to cart!");
    },

    increaseQuantity: (state, action) => {
      const { _id, size, color } = action.payload;

      const existingItem = state.products.find(
        (item) => item._id === _id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity++;
        // toast.success("Product quantity increased!");
      }
    },

    // Decrement quantity for the specific variant, but not below 1
    decreaseQuantity: (state, action) => {
      const { _id, size, color } = action.payload;

      const existingItem = state.products.find(
        (item) => item._id === _id && item.size === size && item.color === color
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        // toast.success("Product quantity decreased!");
      } else {
        toast.error("Minimum quantity is 1.");
      }
    },

    // Remove the specific variant of the product
    deleteItem: (state, action) => {
      const { _id, size, color } = action.payload;

      state.products = state.products.filter(
        (item) => !(item._id === _id && item.size === size && item.color === color)
      );
      toast.error("Product removed from cart");
    },

    resetCart: (state) => {
      state.products = [];
      toast.success("Cart reset successfully!");
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
      );
      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter((b) => b._id !== brand._id);
      } else {
        state.checkedBrands.push(brand);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
      );
      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter((b) => b._id !== category._id);
      } else {
        state.checkedCategorys.push(category);
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
} = reduxSlice.actions;

export default reduxSlice.reducer;
