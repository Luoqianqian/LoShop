import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

const initialState = {orderDetails: {data: {}, loading: true}}

export const getOrderDetails = createAsyncThunk('order/getOrderDetails',
  async (id) => {
    try {
      const res = await axios.get(`/api/order/${id}/details`);
      return res.data;
    } catch(err) {
      return err.response.data;
    }
  }
)

export const createOrder = createAsyncThunk('order/createOrder', 
async (orderInfo) => {
  try {
    const res = await axios.post('/api/order/createOrder', orderInfo);
    return res.data;
  } catch(err) { 
    return err.response.data;
  }
});

export const payOrder = createAsyncThunk('order/payOrder',
  async ({orderId, details}) => {
    const res = await axios.put(`/api/order/${orderId}/pay`, details);
    console.log(res);
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.orderDetails.data = action.payload;
      state.orderDetails.loading = false;
    })
  }
});

export default orderSlice.reducer;
