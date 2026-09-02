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

  protected readonly stars = [1, 2, 3, 4, 5];

  protected isFullStar(star: number): boolean{
    return (this.value() ?? 0) >= star;
  }

  protected isHalfStar(star:number): boolean{
    const value = this.value() ?? 0;

    return value >= star - 0.5 && value < star;
  }
}
