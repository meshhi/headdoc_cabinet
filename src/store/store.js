import { configureStore } from '@reduxjs/toolkit';
import moListReducer from './slices/moListSlice';
import diagramDatesReducer from './slices/diagramDatesSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    moList: moListReducer,
    diagramDates: diagramDatesReducer,
    appointments: appointmentsReducer,
  },
});
