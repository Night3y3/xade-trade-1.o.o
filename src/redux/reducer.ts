import { combineReducers } from "@reduxjs/toolkit";

import addressSlice from "./slices/address";
import nonceSlice from "./slices/nonceSlice";

const rootReducer = combineReducers({
  address: addressSlice,
  nonce: nonceSlice,
});

export default rootReducer;
