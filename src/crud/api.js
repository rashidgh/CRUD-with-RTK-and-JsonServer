import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: builder => ({
    // !get data
    getItems: builder.query({
      query: () => "data",
      providesTags: ["data"],
    }),
    // !post data
    addData: builder.mutation({
      query: data => ({
        url: "data",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),
    // !delete data
    deleteData: builder.mutation({
      query: id => ({
        url: `data/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["data"],
    }),
    // !update data
    updateData: builder.mutation({
      query: ({ id, data }) => ({
        url: `data/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),
  }),
});
export const {
  useGetItemsQuery,
  useAddDataMutation,
  useDeleteDataMutation,
  useUpdateDataMutation,
} = api;
