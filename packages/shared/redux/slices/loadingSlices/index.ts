import {createSlice} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {isLoading: false},
  reducers: {
    setLoadingScreen: state => {
      state.isLoading = true;
    },
    clearLoadingScreen: state => {
      state.isLoading = false;
    },
  },
});

export const {setLoadingScreen, clearLoadingScreen} = loadingSlice.actions;
export default loadingSlice.reducer;
