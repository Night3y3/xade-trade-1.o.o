import { combineReducers } from "@reduxjs/toolkit";

import addressSlice from "./slices/address";
import nonceSlice from "./slices/nonceSlice";
import marketSlice from "./slices/marketSlice";

const rootReducer = combineReducers({
  address: addressSlice,
  nonce: nonceSlice,
  market: marketSlice,
});

export default rootReducer;
