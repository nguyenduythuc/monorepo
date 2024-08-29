import {createSlice} from '@reduxjs/toolkit';
import {UserProfileProps} from '@lfvn-customer/shared/types/models/authModel';

const initialState: {
  token?: string | null;
  user: UserProfileProps | null;
} = {token: null, user: null};

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
  },
});

export const {setToken, clearToken, setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;
