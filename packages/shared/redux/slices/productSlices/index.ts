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
  productSelected?: ProductProps;
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
    setProductSelected: (state, action) => {
      if (state?.productSelected?.id !== action.payload.id) {
        state.productSelected = action.payload;
      }
    },
  },
});

export const {
  setListProduct,
  clearListProduct,
  setRequestPendingMetadata,
  setCifMetadata,
  setProductSelected,
} = productSlice.actions;
export default productSlice.reducer;
