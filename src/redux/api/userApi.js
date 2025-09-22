import { baseApi } from './baseApi';

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllusers: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/teachers?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getUserById: builder.query({
      query: (id) => ({ url: `/teachers/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'user', id }],
    }),
    blockUnblockUser: builder.mutation({
      query: (id) => ({
        url: `/auth/change-status/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['user'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetAllusersQuery,
  useBlockUnblockUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = UserApi;
