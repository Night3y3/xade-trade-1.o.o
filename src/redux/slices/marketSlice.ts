import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  symbol: "Select a Market",
  index_price: 0,
  change_24h_percent: 0,
  volume_24h: 0,
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    setMarket: (state, action) => {
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
  },
});

export const { setMarket, setIndexPrice, setChange24hPercent, setVolume24h } =
  marketSlice.actions;

export default marketSlice.reducer;
