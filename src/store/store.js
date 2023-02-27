import { configureStore } from '@reduxjs/toolkit';
import moListReducer from './slices/moListSlice';
import doctorsReducer from './slices/doctorsSlice';
import userReducer from './slices/userSlice';
import diagramDatesReducer from './slices/diagramDatesSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import meddocsReducer from './slices/meddocsSlice';

export const store = configureStore({
  reducer: {
    moList: moListReducer,
    doctors: doctorsReducer,
    user: userReducer,
    diagramDates: diagramDatesReducer,
    appointments: appointmentsReducer,
    meddocs: meddocsReducer,
  },
});
