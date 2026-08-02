import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);

  private readonly movieId = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly movie = computed(() =>
    this.movieService.movies().find((movie) => movie.id === this.movieId)
  );

  protected rateMovie(rating: number): void {
    this.movieService.rateMovie(this.movieId, rating);
  }

  protected toggleWatched(): void{
    this.movieService.toggleWatched(this.movieId);
  }

  protected togglePending(): void{
    this.movieService.togglePending(this.movieId);
  }
}
