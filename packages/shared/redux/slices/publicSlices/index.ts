import {createSlice} from '@reduxjs/toolkit';

const publicSlice = createSlice({
  name: 'public',
  initialState: {simulate: null},
  reducers: {
    setSimulate: (state, action) => {
      state.simulate = action.payload;
    },
    clearSimulate: state => {
      state.simulate = null;
    },
  },
});

export const {setSimulate, clearSimulate} = publicSlice.actions;
export default publicSlice.reducer;
