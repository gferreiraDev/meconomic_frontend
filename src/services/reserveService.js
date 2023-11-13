import { apiService } from './apiService';

export const reserveService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    addReserve: builder.mutation({
      query: (data) => ({
        url: '/reserves',
        method: 'POST',
        body: data,
      }),
    }),
    listReserves: builder.query({
      query: () => '/reserves',
    }),
    updateReserve: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reserves/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteReserve: builder.mutation({
      query: (id) => ({
        url: `/reserves/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddReserveMutation,
  useListReservesQuery,
  useUpdateReserveMutation,
  useDeleteReserveMutation,
} = reserveService;
