import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';

type WatchFilter = 'all' | 'watched' | 'pending' | 'Not watched';
type SortBy = 'title' | 'year' | 'average-rating' | 'most-voted' | 'user-rating';

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
  protected readonly selectedGenre = signal('all');
  protected readonly sortBy = signal<SortBy>('title');
  protected readonly movies = this.movieService.movies;

  protected readonly filteredMovies = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filter = this.watchFilter();
    const selectedGenre = this.selectedGenre();
    const sortBy = this.sortBy();

    const filtered =  this.movies().filter((movie) => {
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
          
      const matchesGenre =
        selectedGenre === 'all' ||
        movie.genres.includes(selectedGenre);

        return matchesSearch && matchesWatchFilter && matchesGenre;
    });

    return [...filtered].sort((a,b) => {
      if(sortBy === 'title'){
        return a.title.localeCompare(b.title);
      }

      if(sortBy === 'year'){
        return b.year - a.year;
      }

      if(sortBy === 'average-rating'){
        return b.averageRating - a.averageRating;
      }

      if(sortBy === 'most-voted'){
        return b.ratingCount - a.ratingCount;
      }

      if(sortBy === 'user-rating'){
        return (b.userRating ?? 0) - (a.userRating ?? 0);
      }

      return 0;
    });
  });

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected rateMovie(movieId: number, rating: number): void {
    this.movieService.rateMovie(movieId, rating);
  }

  protected toggleWatched(movieId: number): void {
    this.movieService.toggleWatched(movieId);
  }

  protected togglePending(movieId: number): void{
    this.movieService.togglePending(movieId);
  }

  protected updateWatchFilter(filter: WatchFilter): void{
    this.watchFilter.set(filter);
  }

  protected readonly moviesStats = computed(() => {
    const movies = this.movies();

    return {
      total: movies.length,
      watched: movies.filter((movie) => movie.watched).length,
      notWatched: movies.filter((movie) => !movie.watched).length,
      pending: movies.filter((movie) => movie.pending).length,
      rated: movies.filter((movie) => movie.userRating != undefined).length
    };
  });

  protected readonly availableGenres = computed(() => {
    const genres = this.movies().flatMap((movie) => movie.genres);

    return ['all', ...new Set(genres)];
  });

  protected updateSelectedGenre(genre:string): void{
    this.selectedGenre.set(genre);
  }

  protected updateSortBy(value: SortBy): void {
    this.sortBy.set(value);
  }
}
