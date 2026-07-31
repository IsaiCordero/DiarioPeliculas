import { Component, input, output } from '@angular/core';
import { Movie } from '../../../../core/models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  readonly movie = input.required<Movie>();
  readonly ratingSelected = output<number>();
}
