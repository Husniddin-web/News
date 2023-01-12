import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persintence";
const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserStart: (state, action) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      setItem("token", action.payload.token);
    },
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userLogOut: (state) => {
      (state.user = null), (state.loggedIn = false);
    },
  },
});
export const {
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
  userLogOut,
} = authSlice.actions;
export default authSlice.reducer;
