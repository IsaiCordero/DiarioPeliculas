import { Component, input, output } from '@angular/core';
import { Movie } from '../../../../core/models/movie.model';
import { RouterLink } from '@angular/router';
import { RatingSelector } from '../../../../shared/components/rating-selector/rating-selector';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, RatingSelector],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  readonly movie = input.required<Movie>();
  readonly ratingSelected = output<number>();
  readonly watchedToggled = output<void>();
  readonly pendingToggled = output<void>();
}
