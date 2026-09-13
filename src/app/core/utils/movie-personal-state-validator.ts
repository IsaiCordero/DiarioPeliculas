import { MoviePersonalState } from "../models/movie-backup.model";

export function isMoviePersonalState(value: unknown): value is MoviePersonalState {
    if(!value || typeof value !== 'object') {
      return false;
    }

    const movie = value as Record<string, unknown>;

    const ratingIsValid = 
      movie['userRating'] === undefined ||
        (
          typeof movie['userRating'] === 'number' &&
          movie['userRating'] >= 0.5 &&
          movie['userRating'] <= 5 &&
          movie['userRating'] * 2 === Math.round(movie['userRating'] * 2)
        );

    return (
      typeof movie['id'] === 'number' &&
      ratingIsValid &&
      (movie['watched'] === undefined || typeof movie['watched'] === 'boolean') &&
      (movie['pending'] === undefined || typeof movie['pending'] === 'boolean') &&
      (movie['favorite'] === undefined || typeof movie['favorite'] === 'boolean') &&
      (movie['review'] === undefined || typeof movie['review'] === 'string') &&
      (movie['watchedDate'] === undefined || typeof movie['watchedDate'] === 'string')
    );
  }