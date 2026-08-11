import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-rating-selector',
  imports: [],
  templateUrl: './rating-selector.html',
  styleUrl: './rating-selector.css',
})
export class RatingSelector {
  readonly value = input<number | undefined>();
  readonly valueSelected = output<number>();

  protected readonly ratings = [1, 2, 3, 4, 5];
}
