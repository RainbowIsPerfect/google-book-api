import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RESULTS_PER_REQUEST } from "@/constants";
import {
  Category,
  ApiResponse,
  Book,
  Query,
  TransformedResponse,
} from "@/types";

const getSearchQuery = (search: string, category: Category) => {
  return `${search}${category === "all" ? "" : "+subject:" + category}`;
};

const isItemsArrayInResponse = (
  response: ApiResponse,
): response is TransformedResponse => {
  return Array.isArray(response?.items);
};

const transformResponse = (response: ApiResponse): TransformedResponse => {
  return {
    items: [],
    ...response,
    nextPage: 1,
  };
};

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/volumes",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<TransformedResponse, Query>({
      query: ({ category, search, sort, page }) => ({
        url: "",
        params: {
          q: getSearchQuery(search, category),
          orderBy: sort,
          startIndex: page * RESULTS_PER_REQUEST,
          maxResults: RESULTS_PER_REQUEST,
        },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const { category, search, sort } = queryArgs;

        return `${search}${category}${sort}`;
      },
      merge(currentCacheData, responseData, { arg }) {
        currentCacheData.items.push(...responseData.items);
        currentCacheData.nextPage++;
      },
      transformResponse(baseQueryReturnValue: ApiResponse) {
        return transformResponse(baseQueryReturnValue);
      },
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useLazyGetBooksQuery, useGetBookByIdQuery } =
  bookApi;
