import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  symbol: "Select a Market",
  index_price: 0,
  change_24h_percent: 0,
  volume_24h: 0,
  open_interest: 0,
  mark_price: 0,
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    setMarketSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setIndexPrice: (state, action) => {
      state.index_price = action.payload;
    },
    setChange24hPercent: (state, action) => {
      state.change_24h_percent = action.payload;
    },
    setVolume24h: (state, action) => {
      state.volume_24h = action.payload;
    },
    setOpenInterest: (state, action) => {
      state.open_interest = action.payload;
    },
    setMarkPrice: (state, action) => {
      state.mark_price = action.payload;
    },
  },
});

export const {
  setMarketSymbol,
  setIndexPrice,
  setChange24hPercent,
  setVolume24h,
  setOpenInterest,
  setMarkPrice,
} = marketSlice.actions;

export default marketSlice.reducer;
