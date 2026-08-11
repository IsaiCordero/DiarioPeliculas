import { Routes } from '@angular/router';
import { MovieCatalog } from './features/movies/pages/movie-catalog/movie-catalog';
import { MovieDetail } from './features/movies/pages/movie-detail/movie-detail';
import { MovieDiary } from './features/movies/pages/movie-diary/movie-diary';
import { MovieStats } from './features/movies/pages/movie-stats/movie-stats';

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
        path: 'movies/stats',
        component: MovieStats
    },
    {
        path: 'movies/:id',
        component: MovieDetail
    }
];
