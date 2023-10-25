import { ImageLinks, VolumeInfo } from "@/types";
import img from "@/assets/image-placeholder.webp";

export type ValidatedData = {
  [Key in keyof VolumeInfo]-?: VolumeInfo[Key] extends number ? number : string;
};

type Img = keyof ImageLinks;

const imageKeys: Readonly<Img[]> = ["smallThumbnail", "thumbnail"];

export const validateBookData = (data: VolumeInfo) => {
  const nextData: ValidatedData = {
    ...data,
    authors: "No authors provided",
    categories: "No authors provided",
    imageLinks: img,
    description: "No description provided",
  };
  if (data.authors) {
    nextData.authors = data.authors.join(",");
  }
  if (data.categories) {
    nextData.categories = data.categories.join(" / ");
  }
  if (data.description) {
    nextData.description = data.description;
  }
  if (data.imageLinks) {
    for (const key of imageKeys) {
      const imageSrc = data.imageLinks[key];
      if (imageSrc) {
        nextData.imageLinks = imageSrc;
      }
    }
  }
  return nextData;
};

export const validateBookImageSource = (
  sources: ImageLinks | undefined,
): Required<ImageLinks> => {
  return {
    smallThumbnail: sources?.smallThumbnail ? sources.smallThumbnail : "",
    thumbnail: sources?.thumbnail ? sources.thumbnail : "",
  };
};
