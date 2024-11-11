import {createSlice} from '@reduxjs/toolkit';
import {UserProfileProps} from '@lfvn-customer/shared/types/models/authModel';

const initialState: {
  token?: string | null;
  user?: UserProfileProps;
  deeplinkPath?: string | null;
  identityNumber?: string | null;
} = {token: null, user: undefined, deeplinkPath: null, identityNumber: null};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: state => {
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = undefined;
    },
    setDeeplinkPath: (state, action) => {
      state.deeplinkPath = action.payload;
    },
    setIdentityNumber: (state, action) => {
      state.identityNumber = action.payload;
    },
  },
});

export const {
  setToken,
  clearToken,
  setUser,
  clearUser,
  setDeeplinkPath,
  setIdentityNumber,
} = authSlice.actions;
export default authSlice.reducer;
