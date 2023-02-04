// import { GET_MO_LIST_FAIL, GET_MO_LIST_START, GET_MO_LIST_SUCCESS, SET_CURRENT_MO } from "../actions/actionTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moList: [],
  currentMoId: 417,
  isLoading: false,
  error: false,
};

export const moListSlice = createSlice({
  name: "moList",
  initialState,
  reducers: {
    moListFetching(state) {
      state.isLoading = true;
    },

    moListFetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = '';
      state.moList = action.payload;
    },

    moListFetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})

export default moListSlice.reducer;

// export const moListReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case GET_MO_LIST_START:
//       return {...state, isLoading: true}
//     case GET_MO_LIST_SUCCESS:
//       return {...state, isLoading: false, moList: action.payload}
//     case GET_MO_LIST_FAIL:
//       return {...state, isLoading: false, error: action.payload}
//     case SET_CURRENT_MO:
//       return {...state, currentMoId: action.payload}
//     default:
//       return {...state}
//   }
// }