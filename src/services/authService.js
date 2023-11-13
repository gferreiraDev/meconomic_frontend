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
      transformResponse: (response) => {
        return response;
      },
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/users/update-password',
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'DELETE',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authService;
