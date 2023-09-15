import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const unverifiedApi = createApi({
  reducerPath: 'unverified',
  baseQuery: fetchBaseQuery({ baseUrl: "https://invento23-backend-production.up.railway.app/api/v1/" }),
  endpoints: (builder) => ({
    getUnverifiedOrders: builder.query({
      query: () => "orders/unverified"
    }),
    getVerifiedOrders: builder.query({
      query: () => "orders/verify"
    }),
    verifyOrder: builder.mutation({
      query: (id) => ({
        url: "orders/verify",
        method: 'POST',
        body: { id: id } 
      })
    }),
    verifyProshow: builder.mutation({
      query: ({orderId, regId, day}) => ({
        url: "orders/proshow/verify",
        method: 'POST',
        body: { credential:{orderId,regId,day}} 
      })
    })
  }),
});

export const { useGetUnverifiedOrdersQuery, useVerifyOrderMutation,useGetVerifiedOrdersQuery,useVerifyProshowMutation } = unverifiedApi;
