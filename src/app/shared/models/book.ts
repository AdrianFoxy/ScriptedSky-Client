import { Author } from "./author";
import { Genre } from "./genre";
import { Language } from "./language";
import { Publisher } from "./publisher";

export type Book = {
  id: number;
  title: string;
  description: string;
  pictureURL: string;
  releaseYear: number;
  rating: number;
  sizeFormat: string;
  pageNumber: number;
  weight: number;
  amount: number;
  price: number;
  isbn: string;
  author: Author[];
  genre: Genre[];
  publisher: Publisher;
  language: Language;
}
