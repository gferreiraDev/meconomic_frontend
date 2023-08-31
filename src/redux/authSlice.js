import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, { payload }) => {
      const { user, access_token } = payload;
      state.user = user;
      state.token = access_token;
    },
    updateCredentials: (state, { payload }) => {
      const { user } = payload;
      state.user = user;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, updateCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const getUser = (state) => state.auth.user;
export const getToken = (state) => state.auth.token;
