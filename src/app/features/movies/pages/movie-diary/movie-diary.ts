import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';

@Component({
  selector: 'app-movie-diary',
  imports: [RouterLink],
  templateUrl: './movie-diary.html',
  styleUrl: './movie-diary.css',
})
export class MovieDiary {
  private readonly movieService = inject(MovieService);

  protected readonly diaryMovies = computed(() =>
    this.movieService.movies()
        .filter((movie) => movie.watchedDate)
        .sort((a,b) => (b.watchedDate ?? '').localeCompare(a.watchedDate ?? ''))
  );
}
