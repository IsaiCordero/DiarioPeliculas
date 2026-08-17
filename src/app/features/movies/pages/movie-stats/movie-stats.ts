import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-stats',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './movie-stats.html',
  styleUrl: './movie-stats.css',
})
export class MovieStats {
  private readonly movieService = inject(MovieService);

  protected readonly movies = this.movieService.movies;

  protected readonly stats = computed(() => {
    const movies = this.movies();
    const watchedMovies = movies.filter((movie) => movie.watched);
    const pendingMovies = movies.filter((movie) => movie.pending);
    const ratedMovies = movies.filter((movie) => movie.userRating != undefined);

    const averageUserRating =
      ratedMovies.length === 0 
        ? 0
        :ratedMovies.reduce((total, movie) => total + (movie.userRating ?? 0), 0) / ratedMovies.length;

    const genreCounts = watchedMovies
      .flatMap((movie) => movie.genres)
      .reduce<Record<string, number>>((counts, genre) => {
        counts[genre] = (counts[genre] ?? 0) + 1;
        return counts;
      }, {});

    const favoriteGenre =
      Object.entries(genreCounts).sort((a,b) => b[1] - a[1])[0]?.[0] ?? 'Sin datos';

    const lastWatched =
      watchedMovies
        .filter((movie) => movie.watchedDate)
        .sort((a,b) => (b.watchedDate ?? '').localeCompare(a.watchedDate ?? ''))[0];

    return{
      total: movies.length,
      watched: watchedMovies.length,
      pending: pendingMovies.length,
      rated: ratedMovies.length,
      reviewed: movies.filter((movie) => movie.review?.trim()).length,
      favorite: movies.filter((movie) => movie.favorite).length,
      averageUserRating,
      favoriteGenre,
      lastWatched
    };
  });
}
