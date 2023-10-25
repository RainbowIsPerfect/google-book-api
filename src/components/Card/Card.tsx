import { Link } from "react-router-dom";
import { Book } from "@/types";
import image from "@/assets/image-placeholder.webp";
import s from "./Card.module.scss";

type CardProps = {
  book: Book;
};

export const Card = ({ book }: CardProps) => {
  const { id, volumeInfo } = book;

  return (
    <div className={s.card}>
      <Link
        to={`/book/${id}`}
        className={s.card__link}
      >
        <div className={s.card__top}>
          <img
            className={s.card__image}
            src={
              volumeInfo?.imageLinks?.thumbnail ||
              volumeInfo?.imageLinks?.smallThumbnail ||
              image
            }
          />
        </div>
        <div className={s.card__bottom}>
          {volumeInfo?.categories && (
            <p className={s.card__category}>{volumeInfo.categories[0]}</p>
          )}
          <h2
            className={s.card__title}
            title={volumeInfo.title}
          >
            {volumeInfo.title}
          </h2>
          {volumeInfo?.authors && (
            <p className={s.card__authors}>{volumeInfo.authors.join(", ")}</p>
          )}
        </div>
      </Link>
    </div>
  );
};
