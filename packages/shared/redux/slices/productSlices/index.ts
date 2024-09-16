import {createSlice} from '@reduxjs/toolkit';
import {ProductProps} from '@lfvn-customer/shared/types/models/loanModel';
import {MetaDataRequestProps} from '@lfvn-customer/shared/types/services/loanTypes';

const initialState: {
  listProduct: ProductProps[];
  requestPendingMetadata: MetaDataRequestProps | null;
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
  },
});

export const {setListProduct, clearListProduct, setRequestPendingMetadata} =
  productSlice.actions;
export default productSlice.reducer;
