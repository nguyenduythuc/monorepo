import {createSlice} from '@reduxjs/toolkit';
import {UploadESignForSaleFile} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const initialState: {
  cccdInfo?: UploadESignForSaleFile;
  avatarInfo?: UploadESignForSaleFile;
  addressInfo?: UploadESignForSaleFile;
  degreeInfo?: UploadESignForSaleFile;
  resumeInfo?: UploadESignForSaleFile;
  bankInfo?: UploadESignForSaleFile;
} = {};

const eSignForSaleSlice = createSlice({
  name: 'eSignForSale',
  initialState: initialState,
  reducers: {
    setCccdInfo: (state, action) => {
      state.cccdInfo = action.payload;
    },
    setAvatarInfo: (state, action) => {
      state.avatarInfo = action.payload;
    },
    setAddressInfo: (state, action) => {
      state.addressInfo = action.payload;
    },
    setDegreeInfo: (state, action) => {
      state.degreeInfo = action.payload;
    },
    setResumeInfo: (state, action) => {
      state.resumeInfo = action.payload;
    },
    setBankInfo: (state, action) => {
      state.bankInfo = action.payload;
    },
    clearDataEsingForSale: state => {
      state.cccdInfo = undefined;
      state.avatarInfo = undefined;
      state.addressInfo = undefined;
      state.degreeInfo = undefined;
      state.resumeInfo = undefined;
      state.bankInfo = undefined;
    },
  },
});

export const {
  setCccdInfo,
  setAvatarInfo,
  setAddressInfo,
  setDegreeInfo,
  setResumeInfo,
  setBankInfo,
  clearDataEsingForSale,
} = eSignForSaleSlice.actions;
export default eSignForSaleSlice.reducer;
