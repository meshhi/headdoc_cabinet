import { createSlice } from "@reduxjs/toolkit";
import { fetchAppointments } from "./ActionCreators";

const initialState = {
  appointments: [],
  isLoading: false,
  error: false,
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchAppointments.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAppointments.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.appointments = action.payload;
    },
    [fetchAppointments.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})

export default appointmentsSlice.reducer;