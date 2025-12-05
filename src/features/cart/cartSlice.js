import { createSlice } from "@reduxjs/toolkit";

const initalCartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initalCartState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increateItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;

      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
  },
});

export default cartSlice.reducer;
export const { addItem, increateItemQuantity, decreaseItemQuantity } =
  cartSlice.actions;

export const getQuantityById = (id) => (state) => {
  return state.cart.cart.find((item) => item.id === id)?.quantity;
};
