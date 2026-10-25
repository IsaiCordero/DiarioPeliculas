import { describe, expect, it } from 'vitest';
import { isMoviePersonalState } from './movie-personal-state-validator';
import { isMovieList } from './movie-list-validator';

describe('isMoviePersonalState', () => {
  it('acepta una película sin datos personales', () => {
    expect(isMoviePersonalState({ id: 1 })).toBe(true);
  });

  it.each([0.5, 3, 4.5, 5])('acepta la nota %s', (userRating) => {
    expect(isMoviePersonalState({ id: 1, userRating })).toBe(true);
  });

  it.each([0, -1, 5.5, 3.2, '5', null])(
    'rechaza la nota %s',
    (userRating) => {
      expect(isMoviePersonalState({ id: 1, userRating })).toBe(false);
    },
  );

  it('rechaza estados que no sean booleanos', () => {
    expect(isMoviePersonalState({ id: 1, watched: 'true' })).toBe(false);
    expect(isMoviePersonalState({ id: 1, favorite: 1 })).toBe(false);
  });

  it('rechaza datos sin una película válida', () => {
    expect(isMoviePersonalState(null)).toBe(false);
    expect(isMoviePersonalState({ userRating: 4 })).toBe(false);
  });
});

describe('isMovieList', () => {
  it('acepta una lista vacía', () => {
    expect(isMovieList({
      id: 1, name: 'Pendientes', movieIds: [],
    })).toBe(true);
  });

  it('acepta una lista con películas y descripción', () => {
    expect(isMovieList({
      id: 2, name: 'Favoritas', description: 'Mis elegidas',
      movieIds: [1, 3],
    })).toBe(true);
  });

  it('rechaza identificadores de películas que sean texto', () => {
    expect(isMovieList({
      id: 1, name: 'Lista', movieIds: ['1'],
    })).toBe(false);
  });

  it('rechaza listas incompletas', () => {
    expect(isMovieList({ id: 1, name: 'Lista' })).toBe(false);
    expect(isMovieList(null)).toBe(false);
  });
});
