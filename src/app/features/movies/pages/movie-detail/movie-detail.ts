import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { RatingSelector } from '../../../../shared/components/rating-selector/rating-selector';
import { MovieStatusActions } from '../../../../shared/components/movie-status-actions/movie-status-actions';
import { MovieListService } from '../../../../core/services/movie-list';

@Component({
  selector: 'app-movie-detail',
  imports: [RatingSelector, MovieStatusActions],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);
  private readonly movieListService = inject(MovieListService);

  private readonly movieId = Number(this.route.snapshot.paramMap.get('id'));
  protected readonly lists = this.movieListService.lists;

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

  protected toggleFavorite(): void{
    this.movieService.toggleFavorite(this.movieId);
  }

  protected updateReview(review: string): void{
    this.movieService.updateReview(this.movieId, review);
  }

  protected updateWatchedDate(watchedDate: string): void{
    this.movieService.updateWatchedDate(this.movieId, watchedDate);
  }

  protected isMovieInList(listId: number): boolean{
    const list = this.lists().find((item) => item.id === listId);

    return list?.movieIds.includes(this.movieId) ?? false;
  }

  protected toggleMovieInList(listId: number): void{
    this.movieListService.toggleMovieInList(listId, this.movieId);
  }

  
}
