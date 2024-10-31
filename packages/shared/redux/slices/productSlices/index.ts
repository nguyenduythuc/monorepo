import {createSlice} from '@reduxjs/toolkit';
import {
  CifMetadataProps,
  ProductProps,
} from '@lfvn-customer/shared/types/models/loanModel';
import {
  LoanOfferResultProps,
  MetaDataRequestProps,
} from '@lfvn-customer/shared/types/services/loanTypes';
import {OccupationType} from '@lfvn-customer/shared/types/services/localAddressType';

const initialState: {
  listProduct: ProductProps[];
  requestPendingMetadata: MetaDataRequestProps | null;
  cifMetadata?: CifMetadataProps;
  productSelected?: ProductProps;
  loanOfferResult?: LoanOfferResultProps;
  occupations: OccupationType[];
} = {listProduct: [], requestPendingMetadata: null, occupations: []};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setListProduct: (state, action) => {
      state.listProduct = action.payload;
    },
    clearListProduct: state => {
      state.listProduct = [];
    },
    setRequestPendingMetadata: (state, action) => {
      state.requestPendingMetadata = action.payload;
    },
    setCifMetadata: (state, action) => {
      state.cifMetadata = action.payload;
    },
    setProductSelected: (state, action) => {
      if (state?.productSelected?.id !== action.payload.id) {
        state.productSelected = action.payload;
      }
    },
    setLoanOfferResult: (state, action) => {
      state.loanOfferResult = action.payload;
    },
    setOccupations: (state, action) => {
      state.occupations = action.payload;
    },
    clearProductData: state => {
      state.cifMetadata = undefined;
      state.productSelected = undefined;
      state.loanOfferResult = undefined;
      state.listProduct = [];
      state.requestPendingMetadata = null;
      state.occupations = [];
    },
  },
});

export const {
  setListProduct,
  clearListProduct,
  setRequestPendingMetadata,
  setCifMetadata,
  setProductSelected,
  setLoanOfferResult,
  clearProductData,
  setOccupations,
} = productSlice.actions;
export default productSlice.reducer;
