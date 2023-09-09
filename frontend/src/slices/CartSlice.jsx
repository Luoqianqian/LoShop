import { createSlice } from "@reduxjs/toolkit";
import { updataCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart')
  ?JSON.parse(localStorage.getItem('cart'))
  : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if(existItem) {
        state.cartItems = state.cartItems.map((x) => 
          x._id === item._id?item :x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updataCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updataCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymendMethod = action.payload;
      localStorage.setItem = JSON.stringify(state);
    },
    clearItems: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  }
})

export const { 
  addToCart, 
  removeFromCart, 
  saveShippingAddress,
  savePaymentMethod,
  clearItems,
} = CartSlice.actions;
export default CartSlice.reducer;