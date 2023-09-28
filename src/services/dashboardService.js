import { apiService } from './apiService';

export const dashboardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/dashboard',
    }),
  }),
});

export const { useGetDataQuery } = dashboardService;
