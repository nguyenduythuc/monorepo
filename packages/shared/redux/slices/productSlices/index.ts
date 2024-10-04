import {createSlice} from '@reduxjs/toolkit';
import {
  CifMetadataProps,
  ProductProps,
} from '@lfvn-customer/shared/types/models/loanModel';
import {MetaDataRequestProps} from '@lfvn-customer/shared/types/services/loanTypes';

const initialState: {
  listProduct: ProductProps[];
  requestPendingMetadata: MetaDataRequestProps | null;
  cifMetadata?: CifMetadataProps;
} = {listProduct: [], requestPendingMetadata: null};

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
  },
});

export const {
  setListProduct,
  clearListProduct,
  setRequestPendingMetadata,
  setCifMetadata,
} = productSlice.actions;
export default productSlice.reducer;
