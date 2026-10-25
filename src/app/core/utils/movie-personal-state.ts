import { MoviePersonalState } from "../models/movie-backup.model";
import { Movie } from "../models/movie.model";

export function hasMoviePersonalState(movie:Movie): boolean {
    return(
        movie.userRating !== undefined ||
        movie.watched === true ||
        movie.pending === true ||
        movie.favorite === true ||
        movie.review !== undefined ||
        movie.watchedDate !== undefined
    );
}

export function toMoviePersonalState(movie: Movie): MoviePersonalState {
    return {
        id: movie.id,
        userRating: movie.userRating,
        watched: movie.watched,
        pending: movie.pending,
        favorite: movie.favorite,
        review: movie.review,
        watchedDate: movie.watchedDate
    };
}