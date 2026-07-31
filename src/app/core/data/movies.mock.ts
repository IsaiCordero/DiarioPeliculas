import { Movie } from '../models/movie.model';

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    originalTitle: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    genres: ['Ciencia ficcion', 'Accion', 'Thriller'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    averageRating: 4.3,
    ratingCount: 1842,
    synopsis: 'Un ladron especializado en extraer secretos del subconsciente recibe una ultima oportunidad: implantar una idea.'
  },
  {
    id: 2,
    title: 'Parasitos',
    originalTitle: 'Gisaengchung',
    year: 2019,
    director: 'Bong Joon-ho',
    genres: ['Drama', 'Thriller', 'Comedia negra'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    averageRating: 4.5,
    ratingCount: 2310,
    synopsis: 'Una familia con pocos recursos se infiltra poco a poco en la vida de una familia adinerada.'
  },
  {
    id: 3,
    title: 'El viaje de Chihiro',
    originalTitle: 'Sen to Chihiro no kamikakushi',
    year: 2001,
    director: 'Hayao Miyazaki',
    genres: ['Animacion', 'Fantasia', 'Aventura'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    averageRating: 4.6,
    ratingCount: 1987,
    synopsis: 'Una niña queda atrapada en un mundo espiritual y debe encontrar la forma de salvar a sus padres.'
  },
  {
    id: 3,
    title: 'Spiderman: Brand New Day',
    originalTitle: 'Spiderman: Brand New Day',
    year: 2026,
    director: 'Destin Daniel Cretton',
    genres: ['Ciencia ficcion', 'Accion', 'Superhéroes'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BOWNjYWM3NWItOGE0ZS00MWRjLThiZWEtYjc4ZmNmMmU5ZTVmXkEyXkFqcGc@._V1_.jpg',
    averageRating: 4.1,
    ratingCount: 879,
    synopsis: 'Tras el Día del Juicio Final, Peter Parker intenta centrarse en la universidad y abandonar a Spider-Man. Cuando una nueva amenaza pone en peligro a sus amigos, debe romper su promesa y volver al traje.'
  }
];