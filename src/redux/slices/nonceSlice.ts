import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const nonceSlice = createSlice({
  name: "nonce",
  initialState,
  reducers: {
    setNonce: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNonce } = nonceSlice.actions;

export default nonceSlice.reducer;
