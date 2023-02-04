import { configureStore } from '@reduxjs/toolkit';
import moListReducer from './reducers/moListSlice';

export const store = configureStore({
  reducer: {
    moListReducer: moListReducer,
  },
});
