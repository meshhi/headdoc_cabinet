import { createSlice } from "@reduxjs/toolkit";
import { login, loginEsia, logout } from './ActionCreators';

const initialState = {
  isAuth: false,
  isLoading: false,
  error: '',
  userData: '',
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthFlag(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.isAuth = action.payload;
    },
  },
  extraReducers: {
      [login.pending.type]: (state) => {
        state.isLoading = true;
      },
      [login.fulfilled.type]: (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload;
        state.isAuth = true;
      },
      [login.rejected.type]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
      },
      [loginEsia.pending.type]: (state) => {
        state.isLoading = true;
      },
      [loginEsia.fulfilled.type]: (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload;
        state.isAuth = true;
      },
      [loginEsia.rejected.type]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
      },
      [logout.pending.type]: (state) => {
        state.isLoading = true;
      },
      [logout.fulfilled.type]: (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload;
        state.isAuth = false;
      },
      [logout.rejected.type]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    }
  })

export const {setAuthFlag} = userSlice.actions;

export default userSlice.reducer;