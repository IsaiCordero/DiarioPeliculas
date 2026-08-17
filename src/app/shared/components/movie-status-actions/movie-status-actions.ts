import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-movie-status-actions',
  imports: [],
  templateUrl: './movie-status-actions.html',
  styleUrl: './movie-status-actions.css',
})
export class MovieStatusActions {
  readonly watched = input<boolean | undefined>();
  readonly pending = input<boolean | undefined>();
  readonly favorite = input<boolean | undefined>();

  readonly watchedToggled = output<void>();
  readonly pendingToggled = output<void>();
  readonly favoriteToggled = output<void>();
}
