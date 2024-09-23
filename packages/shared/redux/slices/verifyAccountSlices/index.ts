import { createSlice } from '@reduxjs/toolkit';
import { ekycDataType } from '../../../types/services/verifyCustomerTypes';

const initialState: {
    ekycData: ekycDataType;
} = { ekycData: {} };

const verifyAccountSlice = createSlice({
    name: 'verifyAccount',
    initialState: initialState,
    reducers: {
        setVerifyAccount: (state, action) => {
            state.ekycData = action.payload;
        },
        clearVerifyAccount: state => {
            state.ekycData = {};
        },
    },
});

export const { setVerifyAccount, clearVerifyAccount } = verifyAccountSlice.actions;
export default verifyAccountSlice.reducer;
