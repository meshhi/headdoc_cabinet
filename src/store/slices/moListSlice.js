import { createSlice } from "@reduxjs/toolkit";
import { fetchMoList } from "./ActionCreators";

const initialState = {
  moList: [],
  currentMoId: 417,
  isLoading: false,
  error: false,
};

export const moListSlice = createSlice({
  name: "moList",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchMoList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchMoList.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.moList = action.payload;
    },
    [fetchMoList.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})

export default moListSlice.reducer;