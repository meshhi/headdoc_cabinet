import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagram1: null,
  diagram2: null,
  diagram3: null,
};

const diagramDatesSlice = createSlice({
  name: "diagramDates",
  initialState,
  reducers: {
    diagram1SetDate(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.diagram1 = action.payload;
    },
    diagram2SetDate(state, action) {
      state.diagram2 = action.payload;
    },
    diagram3SetDate(state, action) {
      state.diagram3 = action.payload;
    },
  },
})

export const {diagram1SetDate, diagram2SetDate, diagram3SetDate} = diagramDatesSlice.actions;

export default diagramDatesSlice.reducer;