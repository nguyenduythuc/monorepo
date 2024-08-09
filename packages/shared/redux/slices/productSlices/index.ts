import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {listProduct: []},
  reducers: {
    setListProduct: (state, action) => {
      state.listProduct = action.payload;
    },
    clearListProduct: state => {
      state.listProduct = [];
    },
  },
});

export const {setListProduct, clearListProduct} = productSlice.actions;
export default productSlice.reducer;
