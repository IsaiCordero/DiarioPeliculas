import { Component, input, output } from '@angular/core';
import { Movie } from '../../../../core/models/movie.model';
import { RouterLink } from '@angular/router';
import { RatingSelector } from '../../../../shared/components/rating-selector/rating-selector';
import { MovieStatusActions } from '../../../../shared/components/movie-status-actions/movie-status-actions';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, RatingSelector, MovieStatusActions],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  readonly movie = input.required<Movie>();
  readonly ratingSelected = output<number>();
  readonly watchedToggled = output<void>();
  readonly pendingToggled = output<void>();
  readonly favoriteToggled = output<void>();
}
