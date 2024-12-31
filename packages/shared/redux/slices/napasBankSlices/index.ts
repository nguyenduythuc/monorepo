import {createSlice} from '@reduxjs/toolkit';
import {NapasBankProps} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const initialState: {
  bankSelected: NapasBankProps;
} = {
  bankSelected: {
    code: '',
    name: '',
  },
};

const napasBankSlice = createSlice({
  name: 'napasBank',
  initialState: initialState,
  reducers: {
    setBankNapas: (state, action) => {
      state.bankSelected = action.payload;
    },
    clearBankNapas: state => {
      state.bankSelected = {
        code: '',
        name: '',
      };
    },
  },
});

export const {setBankNapas, clearBankNapas} = napasBankSlice.actions;
export default napasBankSlice.reducer;
