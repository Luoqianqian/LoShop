import { createSlice } from "@reduxjs/toolkit";

// userInfo {user: 用户信息, expirationTime: 过期时间 }
const initialState = {
  userInfo: JSON.parse(localStorage.getItem('user')) || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { payload } = action;
      state.userInfo = payload;
      localStorage.setItem('user', JSON.stringify(payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('user');
      localStorage.removeItem('expirationTime');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectExpirationTime = (state) => state.auth.expirationTime;
