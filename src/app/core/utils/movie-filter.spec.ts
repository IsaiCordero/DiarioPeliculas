import { describe, expect, it } from 'vitest';
import { Movie } from '../models/movie.model';
import { filterMovies, MovieFilter } from './movie-filter';

const base: Movie = {
  id: 1, title: 'Matrix', year: 1999,
  director: 'Wachowski', genres: ['Accion'],
  posterUrl: '', synopsis: '', averageRating: 8, ratingCount: 100,
};

const movies: Movie[] = [
  { ...base, watched: true, favorite: true },
  { ...base, id: 2, title: 'Otra', year: 2020,
    director: 'Otro director', genres: ['Drama'], pending: true },
  { ...base, id: 3, title: 'Tercera', year: 2021,
    director: 'Otro director', genres: ['Accion'], watched: false },
];

const defaults: MovieFilter = {
  searchTerm: '', watchFilter: 'all', genre: 'all', decade: 'all',
};

function ids(changes: Partial<MovieFilter> = {}): number[] {
  return filterMovies(movies, { ...defaults, ...changes })
    .map((movie) => movie.id);
}

describe('filterMovies', () => {
  it('devuelve todas sin filtros', () => {
    expect(ids()).toEqual([1, 2, 3]);
  });

  it.each([' MATRIX ', 'wachowski'])('busca por %s', (searchTerm) => {
    expect(ids({ searchTerm })).toEqual([1]);
  });

  it('busca también por género', () => {
    expect(ids({ searchTerm: 'accion' })).toEqual([1, 3]);
  });

  it('distingue vistas y no vistas, incluso sin estado definido', () => {
    expect(ids({ watchFilter: 'watched' })).toEqual([1]);
    expect(ids({ watchFilter: 'not-watched' })).toEqual([2, 3]);
  });

  it('filtra favoritas y pendientes', () => {
    expect(ids({ watchFilter: 'favorite' })).toEqual([1]);
    expect(ids({ watchFilter: 'pending' })).toEqual([2]);
  });

  it('filtra década sin seleccionar género', () => {
    expect(ids({ decade: '2020' })).toEqual([2, 3]);
  });

  it('combina género y década', () => {
    expect(ids({ genre: 'Accion', decade: '2020' })).toEqual([3]);
  });

  it('devuelve vacío cuando los filtros no coinciden', () => {
    expect(ids({ genre: 'Drama', decade: '1990' })).toEqual([]);
  });
});
