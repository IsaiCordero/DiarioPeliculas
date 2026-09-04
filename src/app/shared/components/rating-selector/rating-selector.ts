import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-rating-selector',
  imports: [],
  templateUrl: './rating-selector.html',
  styleUrl: './rating-selector.css',
})
export class RatingSelector {
  readonly value = input<number | undefined>();
  readonly valueSelected = output<number | undefined>();

  protected readonly stars = [1, 2, 3, 4, 5];
  protected readonly hoverValue = signal<number | undefined>(undefined);

  protected isFullStar(star: number): boolean{
    return this.displayValue() >= star;
  }

  protected isHalfStar(star:number): boolean{
    const value = this.displayValue();

    return value >= star - 0.5 && value < star;
  }

  protected displayValue(): number {
    return this.hoverValue() ?? this.value() ?? 0;
  }

  protected clearRating(): void {
    this.hoverValue.set(undefined);
    this.valueSelected.emit(undefined);
  }
}
