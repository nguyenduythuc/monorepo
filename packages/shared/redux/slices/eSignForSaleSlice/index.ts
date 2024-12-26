import {createSlice} from '@reduxjs/toolkit';
import {
  DraftImagesESignForSale,
  UploadESignForSaleFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const initialState: {
  cccdInfo?: UploadESignForSaleFile;
  avatarInfo?: UploadESignForSaleFile;
  addressInfo?: UploadESignForSaleFile;
  degreeInfo?: UploadESignForSaleFile;
  resumeInfo?: UploadESignForSaleFile;
  bankInfo?: UploadESignForSaleFile;
  dataSaleInfo?: {
    saleImportId: string;
    tokenEsign: string;
    idCardNumber: string;
    phoneNumber?: string;
    billCode?: string;
    rollbackDocsTypes?: string;
  };
  draftImages?: DraftImagesESignForSale;
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
    setDataSaleInfo: (state, action) => {
      state.dataSaleInfo = action.payload;
    },
    clearFolderESignForSale: state => {
      state.cccdInfo = undefined;
      state.avatarInfo = undefined;
      state.addressInfo = undefined;
      state.degreeInfo = undefined;
      state.resumeInfo = undefined;
      state.bankInfo = undefined;
    },
    clearDataESignForSale: state => {
      state.cccdInfo = undefined;
      state.avatarInfo = undefined;
      state.addressInfo = undefined;
      state.degreeInfo = undefined;
      state.resumeInfo = undefined;
      state.bankInfo = undefined;
      state.dataSaleInfo = undefined;
      state.draftImages = undefined;
    },
    setDraftImages: (state, action) => {
      state.draftImages = action.payload;
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
  setDataSaleInfo,
  clearDataESignForSale,
  clearFolderESignForSale,
  setDraftImages,
} = eSignForSaleSlice.actions;
export default eSignForSaleSlice.reducer;
