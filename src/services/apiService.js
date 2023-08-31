import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

/*** API optional configuration with refresh token ***/

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     console.log("sending refresh token");

//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);

//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;

//       api.dispatch(setCredentials({ ...refreshResult.data, user }));

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(signout());
//     }
//   }

//   return result;
// };

export const apiService = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
