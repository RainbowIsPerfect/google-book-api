import { useGetBookByIdQuery } from "@/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import { classNames as cl } from "@/utils";
import s from "./CurrentBook.module.scss";
import { Circle } from "@/components/UI/Icons/Circle";

type CurrentBookParams = {
  id: string;
};

export const CurrentBook = () => {
  const { id } = useParams<CurrentBookParams>();
  const { data, isLoading, isError } = useGetBookByIdQuery(id ?? skipToken);

  if (isLoading) {
    return (
      <div className={s.center}>
        <Circle className={s.loader} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={s.center}>
        <p className={s.message}>Couldn't find the book.</p>
      </div>
    );
  }

  if (data) {
    const { title, authors, categories, description } = data.volumeInfo;

    return (
      <>
        {categories && (
          <div className={s.book__categories}>{categories.join(" / ")}</div>
        )}
        <div className={s.book}>
          <div className={cl(s["book__image-wrapper"])}>
            <img
              className={s.book__image}
              src={data.volumeInfo?.imageLinks?.thumbnail}
            />
          </div>
          <div className={s.book__element}>
            <h2 className={s.book__title}>{title}</h2>
            <p className={s.book__info}>
              {authors ? authors.join(", ") : "No authors provided"}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: description ? description : "No desription provided",
              }}
              className={cl(s.book__description)}
            />
          </div>
        </div>
      </>
    );
  }

  return null;
};
