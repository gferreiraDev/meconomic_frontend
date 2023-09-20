import { apiService } from './apiService';

export const cardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation({
      query: (data) => ({
        url: '/cards',
        method: 'POST',
        body: data,
      }),
    }),
    listCards: builder.query({
      query: () => '/cards',
    }),
    findCard: builder.query({
      query: (id) => `/cards/${id}`,
    }),
    updateCard: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cards/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCard: builder.mutation({
      query: ({ id }) => ({
        url: `/cards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCardMutation,
  useListCardsQuery,
  useFindCardQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardService;
