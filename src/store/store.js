import { configureStore } from '@reduxjs/toolkit';
import moListReducer from './slices/moListSlice';
import diagramDatesReducer from './slices/diagramDatesSlice';

export const store = configureStore({
  reducer: {
    moList: moListReducer,
    diagramDates: diagramDatesReducer,
  },
});
