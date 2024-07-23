import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import {apiSlice} from './slices/apiSlices';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

export default rootReducer;
