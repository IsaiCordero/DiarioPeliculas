import { Routes } from '@angular/router';
import { MovieCatalog } from './features/movies/pages/movie-catalog/movie-catalog';
import { MovieDetail } from './features/movies/pages/movie-detail/movie-detail';
import { MovieDiary } from './features/movies/pages/movie-diary/movie-diary';

export const routes: Routes = [
    {
        path: '',
        component: MovieCatalog
    },
    {
        path: 'movies/diary',
        component: MovieDiary
    },
    {
        path: 'movies/:id',
        component: MovieDetail
    }
];
