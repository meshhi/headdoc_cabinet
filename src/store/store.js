import { configureStore } from '@reduxjs/toolkit';
import moListReducer from './slices/moListSlice';
import diagramDatesReducer from './slices/diagramDatesSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import userReducer from './slices/userSlice';
import doctorsSemdReducer from './slices/doctorsSemdSlice';

export const store = configureStore({
  reducer: {
    moList: moListReducer,
    diagramDates: diagramDatesReducer,
    appointments: appointmentsReducer,
    user: userReducer,
    doctors: doctorsSemdReducer,
  },
});
