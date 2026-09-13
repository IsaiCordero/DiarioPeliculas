import { MovieList } from "../models/movie-list.model";

export function isMovieList(value: unknown): value is MovieList{
    if(!value || typeof value !== 'object'){
        return false;
    }

    const list = value as Record<string, unknown>;

    return (
        typeof list['id'] === 'number' &&
        typeof list['name'] === 'string' &&
        (list['description'] === undefined || typeof list['description'] === 'string') &&
        Array.isArray(list['movieIds']) &&
        list['movieIds'].every((movieId) => typeof movieId === 'number')
    );
}