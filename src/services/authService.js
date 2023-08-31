import { apiService } from './apiService';

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => {
        console.log('Response within authService', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log('Error response within authService', response);
        return response;
      },
    }),
    signout: builder.mutation({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'DELETE',
      }),
      transformResponse: (response) => {
        console.log('Response within authService', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log('Error response within authService', response);
        return response;
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authService;
