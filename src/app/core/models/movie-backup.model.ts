import { MovieList } from "./movie-list.model";
import { Movie } from "./movie.model";

export type MoviePersonalState = Pick<
    Movie,
    | 'id'
    | 'userRating'
    | 'watched'
    | 'pending'
    | 'favorite'
    | 'review'
    | 'watchedDate'
>;

export interface MovieBackup {
    version: 1;
    exportedAt: string;
    movies: MoviePersonalState[];
    lists: MovieList[];
}
