import { createSlice } from "@reduxjs/toolkit";
import { fetchMoMeddocs, fetchDoctorMeddocs } from "./ActionCreators";

const initialState = {
  moMeddocs: [],
  doctorMeddocs: [],
  isLoading: false,
  error: false,
};

export const meddocsSlice = createSlice({
  name: "meddocs",
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchMoMeddocs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchMoMeddocs.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.moMeddocs = action.payload[0];
    },
    [fetchMoMeddocs.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchDoctorMeddocs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchDoctorMeddocs.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.doctorMeddocs = action.payload[0];
    },
    [fetchDoctorMeddocs.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default meddocsSlice.reducer;