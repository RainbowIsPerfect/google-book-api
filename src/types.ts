export type Category =
  | "all"
  | "art"
  | "biography"
  | "computers"
  | "history"
  | "medical"
  | "poetry";
export type Sort = "relevance" | "newest";
export type Param = "search" | "category" | "sort";

export type SearchParams = {
  category: Category;
  sort: Sort;
  search: string;
};

export type Query = SearchParams & {
  page: number;
};

export type ImageLinks = {
  thumbnail?: string;
  smallThumbnail?: string;
};

export type VolumeInfo = {
  title: string;
  publisher: string;
  pageCount: number;
  authors?: string[];
  categories?: string[];
  description?: string;
  imageLinks?: ImageLinks;
};

export type Book = {
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
};

export type ApiResponse = {
  totalItems: number;
  items?: Book[];
};

export type TransformedResponse = ApiResponse & {
  items: Book[];
  nextPage: 1;
};
