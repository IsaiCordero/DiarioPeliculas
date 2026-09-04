import { Component, input, output } from '@angular/core';
import { Movie } from '../../../../core/models/movie.model';
import { RouterLink } from '@angular/router';
import { RatingSelector } from '../../../../shared/components/rating-selector/rating-selector';
import { MovieStatusActions } from '../../../../shared/components/movie-status-actions/movie-status-actions';
import { MovieBadges } from '../../../../shared/components/movie-badges/movie-badges';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, RatingSelector, MovieStatusActions, MovieBadges],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  readonly movie = input.required<Movie>();
  readonly ratingSelected = output<number | undefined>();
  readonly watchedToggled = output<void>();
  readonly pendingToggled = output<void>();
  readonly favoriteToggled = output<void>();
}
