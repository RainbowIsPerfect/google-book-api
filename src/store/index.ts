import { store, type AppDispatch, type RootState } from "./store";
import {
  useGetBookByIdQuery,
  useGetBooksQuery,
  useLazyGetBooksQuery,
} from "./api/bookApi"

export {
  useGetBookByIdQuery,
  useGetBooksQuery,
  useLazyGetBooksQuery,
  store,
  type AppDispatch,
  type RootState,
};
