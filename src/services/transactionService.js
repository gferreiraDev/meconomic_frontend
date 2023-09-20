import { apiService } from './apiService';

export const transactionService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: (data) => ({
        url: '/transactions',
        method: 'POST',
        body: data,
      }),
    }),
    listTransactions: builder.query({
      query: (dueDate) => ({
        url: '/transactions',
        params: { dueDate },
      }),
      // keepUnusedDataFor: 5,
    }),
    updateTransaction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/transactions/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTransaction: builder.mutation({
      query: ({ id }) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useListTransactionsQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionService;
