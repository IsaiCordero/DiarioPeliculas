import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';

type WatchFilter = 'all' | 'watched' | 'pending' | 'Not watched';

@Component({
  selector: 'app-movie-catalog',
  imports: [MovieCard],
  templateUrl: './movie-catalog.html',
  styleUrl: './movie-catalog.css',
})
export class MovieCatalog {
  private readonly movieService = inject(MovieService);

  protected readonly searchTerm = signal('');
  protected readonly watchFilter = signal<WatchFilter>('all');
  protected readonly movies = signal(this.movieService.getMovies());

  protected readonly filteredMovies = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filter = this.watchFilter();

    return this.movies().filter((movie) => {
      const matchesSearch =
        !term ||
        movie.title.toLowerCase().includes(term) ||
        movie.director.toLowerCase().includes(term) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(term));
        
        const matchesWatchFilter =
          filter === 'all' ||
          (filter === 'watched' && movie.watched) ||
          (filter === 'pending' && movie.pending) ||
          (filter === 'Not watched' && !movie.watched);

        return matchesSearch && matchesWatchFilter;
    });
  });

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected rateMovie(movieId: number, rating: number): void {
    this.movieService.rateMovie(movieId, rating);
    this.movies.set(this.movieService.getMovies());
  }

  protected toggleWatched(movieId: number): void {
    this.movieService.toggleWatched(movieId);
    this.movies.set(this.movieService.getMovies());
  }

  protected togglePending(movieId: number): void{
    this.movieService.togglePending(movieId);
    this.movies.set(this.movieService.getMovies());
  }

  protected updateWatchFilter(filter: WatchFilter): void{
    this.watchFilter.set(filter);
  }
}
