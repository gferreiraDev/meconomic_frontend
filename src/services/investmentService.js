import { apiService } from './apiService';

export const investmentService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    addInvestment: builder.mutation({
      query: (data) => ({
        url: '/investments',
        method: 'POST',
        body: data,
      }),
    }),
    listInvestments: builder.query({
      query: () => '/investments',
    }),
    findInvestment: builder.query({
      query: (id) => `/investments/${id}`,
    }),
    updateInvestment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/investments/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteInvestment: builder.mutation({
      query: ({ id }) => ({
        url: `/investments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddInvestmentMutation,
  useListInvestmentsQuery,
  useFindInvestmentQuery,
  useUpdateInvestmentMutation,
  useDeleteInvestmentMutation,
} = investmentService;
