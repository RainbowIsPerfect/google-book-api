import { SORTINGS, CATEGORIES } from "@/constants";
import { Category, Sort } from "@/types";

export const isValidSortType = (sortType: unknown): sortType is Sort => {
  if (typeof sortType !== "string") {
    return false;
  }
  return SORTINGS.includes(sortType);
};

export const isValidCategoryType = (
  categoryType: unknown,
): categoryType is Category => {
  if (typeof categoryType !== "string") {
    return false;
  }
  return CATEGORIES.includes(categoryType);
};

export const getValidSortType = (
  sortType: unknown,
  fallback: Sort = "relevance",
): Sort => {
  return isValidSortType(sortType) ? sortType : fallback;
};

export const getValidCategoryType = (
  categoryType: unknown,
  fallback: Category = "all",
): Category => {
  return isValidCategoryType(categoryType) ? categoryType : fallback;
};
