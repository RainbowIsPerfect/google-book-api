import { useSearchParams } from "react-router-dom";
import { useGetBooksQuery, useLazyGetBooksQuery } from "@/store";
import { getValidCategoryType, getValidSortType } from "@/utils";
import { Card } from "@/components/Card";
import { Button } from "@/components/UI/Button";
import { Circle } from "@/components/UI/Icons/Circle";
import s from "./Home.module.scss";

export const Home = () => {
  const [params] = useSearchParams();
  const query = {
    category: getValidCategoryType(params.get("category")),
    sort: getValidSortType(params.get("sort")),
    search: params.get("search") || "",
  };
  const { data, isFetching, isLoading, isError, isUninitialized } =
    useGetBooksQuery({ ...query, page: 0 }, { skip: !query.search });
  const [fetchMoreBooks] = useLazyGetBooksQuery();
  const nextPage = data?.nextPage || 0;

  if (isUninitialized) {
    return (
      <div className={s.center}>
        <p className={s.message}>Enter your search term in the search bar.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={s.center}>
        <Circle className={s.loader} />
      </div>
    );
  }

  if (isError) {
    return <p className={s.message}>An error has occurred.</p>;
  }

  if (data) {
    if (!data.items.length) {
      return (
        <p className={s.message}>Couldn't find a match for {query.search}.</p>
      );
    }
    return (
      <div className={s.cards}>
        <p className={s.message}>Found {data.totalItems} books</p>
        <div className={s["card-container"]}>
          {data.items.map((item) => (
            <Card
              book={item}
              key={item.etag}
            />
          ))}
        </div>
        <div className={s.center}>
          {data.items.length < data.totalItems && (
            <Button
              className={s["load-more-button"]}
              onClick={() => fetchMoreBooks({ ...query, page: nextPage })}
              isLoading={isFetching}
              disabled={isFetching}
            >
              Load more
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
};
