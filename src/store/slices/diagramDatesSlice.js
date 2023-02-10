import { createSlice } from "@reduxjs/toolkit";
import dateConverter from "../../utils/dateConverter";

const initialState = {
  mapDate: dateConverter.dateStampToNearestMonday(),
  diagram1: dateConverter.dateStampToNearestMonday(),
  diagram2: dateConverter.dateStampToNearestMonday(),
  diagram3: dateConverter.dateStampToNearestMonday(),
};

const diagramDatesSlice = createSlice({
  name: "diagramDates",
  initialState,
  reducers: {
    setMapDate(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.mapDate = action.payload;
    },
    diagram1SetDate(state, action) {
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

export const {setMapDate, diagram1SetDate, diagram2SetDate, diagram3SetDate} = diagramDatesSlice.actions;

export default diagramDatesSlice.reducer;