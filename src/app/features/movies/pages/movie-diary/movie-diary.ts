import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { Movie } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-movie-diary',
  imports: [RouterLink],
  templateUrl: './movie-diary.html',
  styleUrl: './movie-diary.css',
})
export class MovieDiary {
  private readonly movieService = inject(MovieService);

  protected readonly diaryMovies = computed(() =>
    this.movieService.movies()
        .filter((movie) => movie.watchedDate)
        .sort((a,b) => (b.watchedDate ?? '').localeCompare(a.watchedDate ?? ''))
  );

  protected readonly diaryGroups = computed(() =>{
    const groups: Record<string, Movie[]> = {};

    for(const movie of this.diaryMovies()) {
      const monthKey = movie.watchedDate?.slice(0,7) ?? 'sin-fecha';

      groups[monthKey] = groups[monthKey] ?? [];
      groups[monthKey].push(movie);
    }

    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([monthKey, movies]) => ({
        monthKey,
        label: this.formatMonthLabel(monthKey),
        movies,
      }));
  });

  private formatMonthLabel(monthKey: string): string {
    if(monthKey === 'sin-fecha'){
      return 'Sin fecha';
    }

    const [year, month] = monthKey.split('-');
    const date = new Date(Number(year), Number(month) -1);

    return new Intl.DateTimeFormat('es-ES', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  protected formatWatchedDate(watchedDate: string | undefined): string {
    if (!watchedDate) {
      return 'Sin fecha';
    }

    const [year, month, day] = watchedDate.split('-');
    const date = new Date(Number(year), Number(month) -1, Number(day));

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }
}
