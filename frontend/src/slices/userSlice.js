import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../config/axios';

export const login = createAsyncThunk('user/login', 
  async (inputs) => {
    try {
      const res = await axios.post('/api/user/auth', inputs);
      return res;
    } catch(err) {
      return err.response;
    }
  }
)

export const register = createAsyncThunk('/user/register',
  async (inputs) => {
    try {
      const res = await axios.post('/api/user/register', inputs);
      return res;
    } catch(err) {
      return err.response;
    }
  }
)

export const logoutUser =  createAsyncThunk('/user/logoutUser',
  async () => {
    try {
      const res = await axios.post('/api/user/logout');
      return res;
    } catch(err) {
      return err.response;
    }
  
  }
)

const userSlice = createSlice({
  name: 'user',
  reducers: {},
})

export default userSlice.reducer;
