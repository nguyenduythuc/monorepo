import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { apiSlice } from './slices/apiSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
