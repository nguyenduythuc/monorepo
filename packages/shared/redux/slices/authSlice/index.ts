import {createSlice} from '@reduxjs/toolkit';
import {UserProfileProps} from '@lfvn-customer/shared/types/models/authModel';

const initialState: {
  token?: string | null;
  user?: UserProfileProps | null;
  deeplinkPath?: string | null;
} = {token: null, user: null, deeplinkPath: null};

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
      state.user = null;
    },
    setDeeplinkPath: (state, action) => {
      state.deeplinkPath = action.payload;
    },
  },
});

export const {setToken, clearToken, setUser, clearUser, setDeeplinkPath} =
  authSlice.actions;
export default authSlice.reducer;
