import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearCredentials } from '../redux/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000',
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAutoLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    api.dispatch(clearCredentials());
  }
  return result;
};

export const apiService = createApi({
  baseQuery: baseQueryWithAutoLogout,
  endpoints: (builder) => ({}),
});
