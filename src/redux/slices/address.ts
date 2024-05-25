import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice.reducer;
