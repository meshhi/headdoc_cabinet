import { createSlice } from "@reduxjs/toolkit";
import { login, loginEsia, logout, getEsiaUrl, checkAuthentication } from './ActionCreators';

const initialState = {
  isAuth: false,
  isLoading: false,
  error: '',
  esiaLoading: false,
  esiaError: '',
  esiaUrl: '',
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
      [checkAuthentication.pending.type]: (state) => {
        state.isLoading = true;
      },
      [checkAuthentication.fulfilled.type]: (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload;
        state.isAuth = true;
      },
      [checkAuthentication.rejected.type]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
      },
      [loginEsia.pending.type]: (state) => {
        state.esiaLoading = true;
      },
      [loginEsia.fulfilled.type]: (state, action) => {
        state.esiaLoading = false;
        state.esiaError = '';
        state.userData = action.payload;
        state.isAuth = true;
        state.esiaUrl = '';
      },
      [loginEsia.rejected.type]: (state, action) => {
        state.esiaLoading = false;
        state.esiaError = action.payload;
        state.isAuth = false;
        state.esiaUrl = '';
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
      },
      [getEsiaUrl.pending.type]: (state) => {
        state.isLoading = true;
      },
      [getEsiaUrl.fulfilled.type]: (state, action) => {
        // state.isLoading = false;
        state.esiaError = '';
        state.esiaUrl = action.payload;
      },
      [getEsiaUrl.rejected.type]: (state, action) => {
        state.isLoading = false;
        state.esiaError = action.payload;
      }
    }
  })

export const {setAuthFlag} = userSlice.actions;

export default userSlice.reducer;