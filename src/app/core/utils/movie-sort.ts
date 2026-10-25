import { Movie } from "../models/movie.model";

export type SortBy =
  | 'title'
  | 'year'
  | 'average-rating'
  | 'most-voted'
  | 'user-rating';

export function sortMovies(movies: readonly Movie[], sortBy: SortBy): Movie[] {
  return [...movies].sort((a,b) => {
    switch (sortBy){
      case "title":
        return a.title.localeCompare(b.title);
      case "year":
        return b.year - a.year;
      case "average-rating":
        return b.averageRating - a.averageRating;
      case "most-voted":
        return b.ratingCount - a.ratingCount;
      case "user-rating":
        return (b.userRating ?? 0) - (a.userRating ?? 0);
    }
  });
}
