import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import {apiSlice} from './slices/apiSlices';
import authReducer from './slices/authSlice';
import publicReducer from './slices/publicSlices';

const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  public: publicReducer,
});

export default rootReducer;
