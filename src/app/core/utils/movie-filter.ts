import { Movie } from "../models/movie.model";

export type WatchFilter = 'all' | 'watched' | 'pending' | 'not-watched' | 'favorite';

export interface MovieFilter {
  searchTerm: string;
  watchFilter: WatchFilter;
  genre: string;
  decade: string;
}

export function filterMovies(
  movies: readonly Movie[],
  filters: MovieFilter
): Movie[] {
  const term = filters.searchTerm.toLowerCase().trim();

  return movies.filter((movie) => {
    const matchesSearch =
      !term ||
      movie.title.toLowerCase().includes(term) ||
      movie.director.toLowerCase().includes(term) ||
      movie.genres.some((genre) => genre.toLowerCase().includes(term));

    const matchesStatus =
      filters.watchFilter === 'all' ||
      (filters.watchFilter === 'watched' && movie.watched) ||
      (filters.watchFilter === 'pending' && movie.pending) ||
      (filters.watchFilter === 'favorite' && movie.favorite) ||
      (filters.watchFilter === 'not-watched' && !movie.watched);

    const matchesGenre =
      filters.genre === 'all' || movie.genres.includes(filters.genre);

    const matchesDecade =
      filters.decade === 'all' ||
      String(Math.floor(movie.year / 10) * 10) === filters.decade;

    return matchesSearch && matchesStatus && matchesGenre && matchesDecade;
  });
}
