import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Select } from "@/components/UI/Select";
import { SearchParams } from "@/types";
import { getValidCategoryType, getValidSortType } from "@/utils";
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

export const Header = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const changeQuery = <T extends keyof SearchParams>(
    key: T,
    value: SearchParams[T],
  ) => {
    navigate("/");
    setParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  };

  return (
    <div className={s.header}>
      <h1 className={s.header__heading}>
        <Link className={s.header__link} to={"/"}>Book shop</Link>
      </h1>
      <div className={s.header__controls}>
        <Input
          className={s.header__search}
          type="search"
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const target = e.target as HTMLInputElement;
              changeQuery("search", target.value);
            }
          }}
          defaultValue={params.get("search") || ""}
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
                changeQuery("category", getValidCategoryType(e.target.value));
              }}
              value={params.get("category") || "all"}
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
              onChange={(e) =>
                changeQuery("sort", getValidSortType(e.target.value))
              }
              value={params.get("sort") || "relevance"}
              options={sortOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
