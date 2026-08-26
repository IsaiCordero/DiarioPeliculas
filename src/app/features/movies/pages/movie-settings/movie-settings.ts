import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieListService } from '../../../../core/services/movie-list';

@Component({
  selector: 'app-movie-settings',
  imports: [],
  templateUrl: './movie-settings.html',
  styleUrl: './movie-settings.css',
})
export class MovieSettings {
  private readonly movieService = inject(MovieService);
  private readonly movieListService = inject(MovieListService);

  protected readonly isConfirmingReset = signal(false);

  protected askResetConfirmation(): void {
    this.isConfirmingReset.set(true);
  }

  protected cancelReset(): void {
    this.isConfirmingReset.set(false);
  }

  protected confirmReset(): void {
    this.movieService.resetMovieState();
    this.movieListService.resetLists();
    this.isConfirmingReset.set(false);
  }
}
