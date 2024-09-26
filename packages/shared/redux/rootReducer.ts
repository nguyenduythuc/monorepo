import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { apiSlice } from './slices/apiSlices';
import authReducer from './slices/authSlice';
import publicReducer from './slices/publicSlices';
import productReducer from './slices/productSlices';
import loadingSlices from './slices/loadingSlices';
import verifyAccountSlices from './slices/verifyAccountSlices';

const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  public: publicReducer,
  product: productReducer,
  loading: loadingSlices,
  verifyAccount: verifyAccountSlices
});

export default rootReducer;
