import { useRef } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Select } from "@/components/UI/Select";
import { SearchParams } from "@/types";
import { Button } from "@/components/UI/Button";
import s from "./Header.module.scss";

const sortOptions = [
  {
    value: "relevance",
    label: "relevance",
  },
  {
    value: "newest",
    label: "newest",
  },
];

const categoryOptions = [
  {
    value: "all",
    label: "all",
  },
  {
    value: "art",
    label: "art",
  },
  {
    value: "biography",
    label: "biography",
  },
  {
    value: "computers",
    label: "computers",
  },
  {
    value: "history",
    label: "history",
  },
  {
    value: "medical",
    label: "medical",
  },
  {
    value: "poetry",
    label: "poetry",
  },
];

type StringSearchParams = { [Key in keyof SearchParams]: string };

export const Header = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ref = useRef<StringSearchParams>({
    category: params.get("category") || "all",
    search: params.get("search") || "",
    sort: params.get("sort") || "relevance",
  });

  const changeQuery = () => {
    const nextParams = createSearchParams({
      category: ref.current.category,
      search: ref.current.search,
      sort: ref.current.sort,
    }).toString();

    navigate(`/?${nextParams}`);
  };

  return (
    <div className={s.header}>
      <h1 className={s.header__heading}>
        <Link
          className={s.header__link}
          to={"/"}
        >
          Book shop
        </Link>
      </h1>
      <div className={s.header__controls}>
        <Input
          className={s.header__search}
          type="search"
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeQuery();
            }
          }}
          onChange={(e) => {
            ref.current.search = e.target.value;
          }}
          defaultValue={ref.current.search}
        />
        <div className={s.header__selections}>
          <div className={s["header__select-stack"]}>
            <label
              className={s.header__label}
              htmlFor="category"
            >
              Category
            </label>
            <Select
              className={s.header__select}
              id="category"
              onChange={(e) => {
                ref.current.category = e.target.value;
              }}
              defaultValue={ref.current.category}
              options={categoryOptions}
            />
          </div>
          <div className={s["header__select-stack"]}>
            <label
              className={s.header__label}
              htmlFor="sort"
            >
              Sort
            </label>
            <Select
              className={s.header__select}
              id="sort"
              onChange={(e) => (ref.current.sort = e.target.value)}
              defaultValue={ref.current.sort}
              options={sortOptions}
            />
          </div>
        </div>
        <Button
          className={s.header__button}
          onClick={changeQuery}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
