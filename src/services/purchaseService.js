import { apiService } from './apiService';

export const purchaseService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    addPurchase: builder.mutation({
      query: (data) => ({
        url: '/purchases',
        method: 'POST',
        body: data,
      }),
    }),
    listPurchases: builder.query({
      query: ({ cardId, dueDate }) => ({
        url: '/invoices',
        params: { cardId, dueDate },
      }),
    }),
    updatePurchase: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchases/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePurchase: builder.mutation({
      query: ({ id }) => ({
        url: `/purchases/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddPurchaseMutation,
  useListPurchasesQuery,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseService;
