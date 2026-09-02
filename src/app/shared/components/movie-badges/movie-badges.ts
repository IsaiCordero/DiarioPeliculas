import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-badges',
  imports: [],
  templateUrl: './movie-badges.html',
  styleUrl: './movie-badges.css',
})
export class MovieBadges {
  readonly watched = input<boolean | undefined>();
  readonly pending = input<boolean | undefined>();
  readonly favorite = input<boolean | undefined>();
  readonly userRating = input<number | undefined>();
}
