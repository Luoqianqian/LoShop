import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../config/axios';

const initialState = { productsList: { products: [], page: 1, pages: 1 }, productsTop: [], productDetails: {}};

export const getProducts = createAsyncThunk('products/getProducts',
    async ({keyword = '', pageNumber = 1}) => {
      try {
        const res = await axios.get(`api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        return res.data;
      }catch(err){
        return err.response;
      }
    }
);

export const getTopProducts = createAsyncThunk('products/getTopProducts',
    async () => {
      try {
        const res = await axios.get('api/products/top');
        return res.data;
      } catch(err) { 
        return err.response 
      }
    }
);

export const getProductDetails = createAsyncThunk('products/getProductDetails',
    async (productId) => {
      try {
        const res = await axios.get(`api/products/${productId}`);
        return res.data;
      } catch(err) {
        return err.response;
      }
    }
);

export const createReviews = createAsyncThunk('products/createReviews',
    async (reviewInfo) => {
      try {
        const res = await axios.post(`api/products/${reviewInfo.productId}/reviews`, reviewInfo);
        return res;
      } catch(err) {
        return err.response;
      }
    }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const { products, page, pages } = action.payload;
      state.productsList = { products, page, pages };
    })
    builder.addCase(getTopProducts.fulfilled, (state, action) => {
      state.productsTop = action.payload;
    })
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.productDetails = action.payload;
    })
  },
});

export default productsSlice.reducer;
