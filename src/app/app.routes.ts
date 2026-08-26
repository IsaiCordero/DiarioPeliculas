import { Routes } from '@angular/router';
import { MovieCatalog } from './features/movies/pages/movie-catalog/movie-catalog';
import { MovieDetail } from './features/movies/pages/movie-detail/movie-detail';
import { MovieDiary } from './features/movies/pages/movie-diary/movie-diary';
import { MovieStats } from './features/movies/pages/movie-stats/movie-stats';
import { MovieLists } from './features/movies/pages/movie-lists/movie-lists';
import { MovieListDetail } from './features/movies/pages/movie-list-detail/movie-list-detail';
import { MovieSettings } from './features/movies/pages/movie-settings/movie-settings';

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
        path: 'movies/lists',
        component: MovieLists
    },
    {
        path: 'movies/lists/:id',
        component: MovieListDetail
    },
    {
        path: 'movies/settings',
        component: MovieSettings
    },
    {
        path: 'movies/:id',
        component: MovieDetail
    }
];
