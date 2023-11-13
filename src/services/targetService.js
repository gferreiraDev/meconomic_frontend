import { apiService } from './apiService';

export const targetService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    addTarget: builder.mutation({
      query: (data) => ({
        url: '/targets',
        method: 'POST',
        body: data,
      }),
    }),
    listTargets: builder.query({
      query: () => '/targets',
      transformResponse: (response) => {
        return response;
      },
    }),
    updateTarget: builder.mutation({
      query: ({ id, data }) => ({
        url: `/targets/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteTarget: builder.mutation({
      query: (id) => ({
        url: `/targets/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddTargetMutation,
  useListTargetsQuery,
  useUpdateTargetMutation,
  useDeleteTargetMutation,
} = targetService;
