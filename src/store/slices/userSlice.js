import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthFlag(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.isAuth = action.payload;
    },
  },
})

export const {setAuthFlag} = userSlice.actions;

export default userSlice.reducer;