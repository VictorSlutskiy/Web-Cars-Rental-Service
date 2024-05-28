import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildUrl } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";
import { getCategories } from "../categories/categoriesSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "User"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ _id }) => `/products/${_id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => buildUrl("/products", params),
      providesTags: ["Products"],
    }),
    getUsers: builder.query({
      query: (search) => `/users?search=${search}`,
      providesTags: ["User"],
    }),
    getCat: builder.query({
      query: ({_id}) => `/categories/${_id}`,
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery, useGetUsersQuery , useGetCatQuery} = apiSlice;
