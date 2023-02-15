import { createSlice } from "@reduxjs/toolkit";
import { fetchMoList } from "./ActionCreators";

const initialState = {
  moList: [],
  isLoading: false,
  error: false,
  currentMoId: null,
  currentMoName: '',
};

export const moListSlice = createSlice({
  name: "moList",
  initialState,
  reducers: {
    setCurrentMo(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.currentMoId = action.payload.id;
      state.currentMoName = action.payload.name;
    },
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

export const {setCurrentMo} = moListSlice.actions;

export default moListSlice.reducer;