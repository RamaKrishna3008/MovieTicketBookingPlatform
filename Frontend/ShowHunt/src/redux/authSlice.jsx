import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    role: null,
    userDetails: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.role = action.payload.role;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state) => {
      state.role = null;
      state.userDetails = null;
    },
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
    }
  }
});

export const { loginSuccess, logout,updateUserDetails } = authSlice.actions;
export default authSlice.reducer;

