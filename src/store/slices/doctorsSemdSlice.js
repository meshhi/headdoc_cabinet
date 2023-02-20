import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctors, fetchMoMeddocs } from "./ActionCreators";

const initialState = {
  doctors: [],
  semdPercent: 0,
  isLoading: false,
  error: false,
};

export const doctorsSemdSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchDoctors.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchDoctors.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.doctors = action.payload;
    },
    [fetchDoctors.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchMoMeddocs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchMoMeddocs.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.semdPercent = action.payload[0].semd_percent;
    },
    [fetchMoMeddocs.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
  }
})

export default doctorsSemdSlice.reducer;