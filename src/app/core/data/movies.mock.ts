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
    synopsis: 'Una nina queda atrapada en un mundo espiritual y debe encontrar la forma de salvar a sus padres.'
  },
  {
    id: 4,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    year: 2014,
    director: 'Christopher Nolan',
    genres: ['Ciencia ficcion', 'Drama', 'Aventura'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    averageRating: 4.4,
    ratingCount: 2205,
    synopsis: 'Un grupo de exploradores viaja a traves de un agujero de gusano para encontrar un nuevo hogar para la humanidad.'
  },
  {
    id: 5,
    title: 'La La Land',
    originalTitle: 'La La Land',
    year: 2016,
    director: 'Damien Chazelle',
    genres: ['Musical', 'Romance', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    averageRating: 4.1,
    ratingCount: 1430,
    synopsis: 'Una aspirante a actriz y un pianista de jazz se enamoran mientras persiguen sus sueños en Los Angeles.'
  },
  {
    id: 6,
    title: 'Mad Max: Fury Road',
    originalTitle: 'Mad Max: Fury Road',
    year: 2015,
    director: 'George Miller',
    genres: ['Accion', 'Aventura', 'Ciencia ficcion'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
    averageRating: 4.2,
    ratingCount: 1765,
    synopsis: 'En un mundo desertico, Max se une a Furiosa para escapar de un tirano y buscar libertad.'
  },
  {
    id: 7,
    title: 'Whiplash',
    originalTitle: 'Whiplash',
    year: 2014,
    director: 'Damien Chazelle',
    genres: ['Drama', 'Musica'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
    averageRating: 4.4,
    ratingCount: 1650,
    synopsis: 'Un joven baterista entra en una prestigiosa escuela de musica y se enfrenta a un profesor implacable.'
  },
  {
    id: 8,
    title: 'Arrival',
    originalTitle: 'Arrival',
    year: 2016,
    director: 'Denis Villeneuve',
    genres: ['Ciencia ficcion', 'Drama', 'Misterio'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',
    averageRating: 4.0,
    ratingCount: 1288,
    synopsis: 'Una linguista intenta comunicarse con visitantes extraterrestres mientras el mundo teme una crisis global.'
  },
  {
    id: 9,
    title: 'The Grand Budapest Hotel',
    originalTitle: 'The Grand Budapest Hotel',
    year: 2014,
    director: 'Wes Anderson',
    genres: ['Comedia', 'Aventura', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    averageRating: 4.1,
    ratingCount: 1194,
    synopsis: 'Un conserje legendario y su joven aprendiz se ven envueltos en una aventura llena de robos, herencias y persecuciones.'
  },
  {
    id: 10,
    title: 'Her',
    originalTitle: 'Her',
    year: 2013,
    director: 'Spike Jonze',
    genres: ['Romance', 'Drama', 'Ciencia ficcion'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg',
    averageRating: 4.0,
    ratingCount: 980,
    synopsis: 'Un hombre solitario desarrolla una relacion emocional con un sistema operativo inteligente.'
  },
  {
    id: 11,
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
