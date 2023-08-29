import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const unverifiedApi = createApi({
  reducerPath: 'unverified',
  baseQuery: fetchBaseQuery({ baseUrl: "https://invento23-backend-production.up.railway.app/api/v1/" }),
  endpoints: (builder) => ({
    getUnverifiedOrders: builder.query({
      query: () => "orders/unverified"
    }),
    verifyOrder: builder.mutation({
      query: (id) => ({
        url: "orders/verify",
        method: 'POST',
        body: { id: '1234' } 
      })
    })
  }),
});

export const { useGetUnverifiedOrdersQuery, useVerifyOrderMutation } = unverifiedApi;
