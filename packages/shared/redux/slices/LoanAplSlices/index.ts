import {createSlice} from '@reduxjs/toolkit';
export interface LoanAplState {
  deviceId: string;
  deviceName?: string;
  aplData?: {flowId: string};
  aplAddressCode?: {
    city: string;
    district: string;
    ward: string;
    detailAddress: string;
  };
}
const initialState: LoanAplState = {
  deviceId: '',
};

const loanAplSlice = createSlice({
  name: 'loanApl',
  initialState: initialState,
  reducers: {
    setDeviceInfo: (state, action) => {
      state.deviceId = action.payload.deviceId;
    },
    setAplData: (state, action) => {
      state.aplData = action.payload;
    },
    setAplAddressData: (state, action) => {
      state.aplAddressCode = action.payload;
    },
    clearAplAddressData: state => {
      state.aplAddressCode = undefined;
    },
    clearAplData: state => {
      state.aplData = undefined;
    },
    clearDeviceInfo: state => {
      state.deviceId = '';
      state.deviceName = undefined;
    },
  },
});

export const {
  setDeviceInfo,
  setAplData,
  setAplAddressData,
  clearAplAddressData,
  clearAplData,
  clearDeviceInfo,
} = loanAplSlice.actions;
export default loanAplSlice.reducer;
