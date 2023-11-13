import { apiService } from './apiService';

export const statementService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: '/statements',
        method: 'POST',
        body: data,
      }),
    }),
    list: builder.query({
      query: () => '/statements',
    }),
    update: builder.mutation({
      query: ({ id, data }) => ({
        url: `/statements/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    delete: builder.mutation({
      query: ({ id }) => ({
        url: `/statements/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useListQuery,
  useUpdateMutation,
  useDeleteMutation,
} = statementService;
