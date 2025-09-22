import { baseApi } from './baseApi';

const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: ({ currentYear }) => ({
        url: `/summary?year=${currentYear}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashBoardApi;
