import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "md5";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://no23.lavina.tech" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    getUserInfo: builder.mutation({
      query: (data) => ({
        url: "/myself",
        method: "GET",
        headers: {
          Key: data.headers.key,
          Sign: md5("GET" + "/myself" + data.headers.secret),
        },
      }),
    }),
    searchBook: builder.mutation({
      query: (data) => ({
        url: `/books/${data.search}`,
        method: "GET",
        headers: {
          Key: data.headers.key,
          Sign: md5("GET" + `/books/${data.search}` + data.headers.secret),
        },
      }),
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        headers: {
          Key: data.headers.key,
          Sign: md5(
            `POST/books{"isbn":"${data.body.isbn}"}${data.headers.secret}`
          ),
        },
        body: data.body,
      }),
    }),
    getAllBooks: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "GET",
        headers: {
          Key: data.headers.key,
          Sign: md5(`GET/books${data.headers.secret}`),
        },
      }),
    }),
    editBook: builder.mutation({
      query: (data) => ({
        url: `/books/${data.book.id}`,
        method: "PATCH",
        headers: {
          Key: data.headers.key,
          Sign: md5(
            `PATCH/books/${data.book.id}{"status":${data.body.status}}${data.headers.secret}`
          ),
        },
        body: data.body,
      }),
    }),
    deleteBook: builder.mutation({
      query: (data) => ({
        url: `/books/${data.book.id}`,
        method: "DELETE",
        headers: {
          Key: data.headers.key,
          Sign: md5(`DELETE/books/${data.book.id}${data.headers.secret}`),
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSearchBookMutation,
  useCreateBookMutation,
  useGetAllBooksMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = apiSlice;
