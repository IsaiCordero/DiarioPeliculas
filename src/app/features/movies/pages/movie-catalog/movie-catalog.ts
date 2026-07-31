import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-movie-catalog',
  imports: [MovieCard],
  templateUrl: './movie-catalog.html',
  styleUrl: './movie-catalog.css',
})
export class MovieCatalog {
  private readonly movieService = inject(MovieService);

  protected readonly searchTerm = signal('');
  protected readonly movies = signal(this.movieService.getMovies());

  protected readonly filteredMovies = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if(!term) {
      return this.movies();
    }
    
    return this.movies().filter((movie) =>
    movie.title.toLowerCase().includes(term) ||
    movie.director.toLowerCase().includes(term) ||
    movie.genres.some((genre) => genre.toLowerCase().includes(term))
    );
  });

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected rateMovie(movieId: number, rating: number): void {
    this.movieService.rateMovie(movieId, rating);
    this.movies.set(this.movieService.getMovies());
  }
}
