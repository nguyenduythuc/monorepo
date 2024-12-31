import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import {apiSlice} from './slices/apiSlices';
import authReducer from './slices/authSlice';
import publicReducer from './slices/publicSlices';
import productReducer from './slices/productSlices';
import loadingSlices from './slices/loadingSlices';
import eSignForSaleSlice from './slices/eSignForSaleSlice';
import verifyAccountSlices from './slices/verifyAccountSlices';
import LoanAplSlices from './slices/LoanAplSlices';
import napasBankSlice from './slices/napasBankSlices';

const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  public: publicReducer,
  product: productReducer,
  loading: loadingSlices,
  verifyAccount: verifyAccountSlices,
  loanApl: LoanAplSlices,
  eSignForSale: eSignForSaleSlice,
  napasBank: napasBankSlice,
});

export default rootReducer;
