import { Routes } from '@angular/router';
import { MovieCatalog } from './features/movies/pages/movie-catalog/movie-catalog';
import { MovieDetail } from './features/movies/pages/movie-detail/movie-detail';

export const routes: Routes = [
    {
        path: '',
        component: MovieCatalog
    },
    {
        path: 'movies/:id',
        component: MovieDetail
    }
];
