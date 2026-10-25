import { describe, expect, it } from 'vitest';
import { Movie } from '../models/movie.model';
import { sortMovies, SortBy } from './movie-sort';

const base: Movie = {
  id: 1,
  title: 'Zeta',
  year: 2000,
  director: 'Director',
  genres: [],
  posterUrl: '',
  averageRating: 6,
  ratingCount: 10,
  synopsis: '',
};

function createMovies(): Movie[] {
  return [
    { ...base },
    {
      ...base,
      id: 2,
      title: 'Alfa',
      year: 2020,
      averageRating: 9,
      ratingCount: 100,
      userRating: 4.5,
    },
  ];
}

describe('sortMovies', () => {
  const criteria: SortBy[] = [
    'title', 'year', 'average-rating', 'most-voted', 'user-rating',
  ];

  it.each(criteria)('ordena correctamente por %s', (criterion) => {
    const result = sortMovies(createMovies(), criterion);

    expect(result.map((movie) => movie.id)).toEqual([2, 1]);
  });

  it('no modifica el orden del array original', () => {
    const movies = createMovies();

    sortMovies(movies, 'title');

    expect(movies.map((movie) => movie.id)).toEqual([1, 2]);
  });

  it('acepta un catálogo vacío', () => {
    expect(sortMovies([], 'title')).toEqual([]);
  });
});
