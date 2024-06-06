import { createSlice } from "@reduxjs/toolkit";

const initialState = { nonce: null };

export const nonceSlice = createSlice({
  name: "nonce",
  initialState,
  reducers: {
    setNonce: (state, action) => {
      state.nonce = action.payload;
    },
  },
});

export const { setNonce } = nonceSlice.actions;

export default nonceSlice.reducer;
