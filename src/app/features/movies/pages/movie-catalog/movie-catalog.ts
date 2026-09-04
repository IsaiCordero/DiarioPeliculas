import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';
import { RouterLink } from '@angular/router';

type WatchFilter = 'all' | 'watched' | 'pending' | 'not-watched' | 'favorite';
type SortBy = 'title' | 'year' | 'average-rating' | 'most-voted' | 'user-rating';

@Component({
  selector: 'app-movie-catalog',
  imports: [MovieCard, RouterLink],
  templateUrl: './movie-catalog.html',
  styleUrl: './movie-catalog.css',
})
export class MovieCatalog {
  private readonly movieService = inject(MovieService);

  protected readonly searchTerm = signal('');
  protected readonly watchFilter = signal<WatchFilter>('all');
  protected readonly selectedGenre = signal('all');
  protected readonly sortBy = signal<SortBy>('title');
  protected readonly selectedDecade = signal('all');

  protected readonly movies = this.movieService.movies;

  protected readonly filteredMovies = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filter = this.watchFilter();
    const selectedGenre = this.selectedGenre();
    const sortBy = this.sortBy();
    const selectedDecade = this.selectedDecade();

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
        (filter === 'favorite' && movie.favorite) ||
        (filter === 'not-watched' && !movie.watched);

      const movieDecade = Math.floor(movie.year / 10) * 10;

      const matchesDecade =
        selectedDecade === 'all' ||
        String(movieDecade) == selectedDecade;
          
      const matchesGenre =
        selectedGenre === 'all' ||
        movie.genres.includes(selectedGenre);

        return matchesSearch && matchesWatchFilter && matchesGenre && matchesDecade;
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

  protected readonly hasActiveFilters = computed(() =>
    this.searchTerm().trim() !== '' ||
    this.watchFilter() !== 'all' ||
    this.selectedGenre() !== 'all' ||
    this.selectedDecade() !== 'all' ||
    this.sortBy() !== 'title' 
  );

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.watchFilter.set('all');
    this.selectedGenre.set('all');
    this.selectedDecade.set('all');
    this.sortBy.set('title');
  }

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected rateMovie(movieId: number, rating: number | undefined): void {
    this.movieService.rateMovie(movieId, rating);
  }

  protected toggleWatched(movieId: number): void {
    this.movieService.toggleWatched(movieId);
  }

  protected togglePending(movieId: number): void{
    this.movieService.togglePending(movieId);
  }

  protected toggleFavorite(movieId: number): void{
    this.movieService.toggleFavorite(movieId);
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
      rated: movies.filter((movie) => movie.userRating != undefined).length,
      favorite: movies.filter((movie) => movie.favorite).length
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

  protected readonly reviewedMovies = computed(() => 
  this.movies().filter((movie) => movie.review?.trim())
  );

  protected readonly availableDecades = computed(() => {
    const decades = this.movies().map((movie) => Math.floor(movie.year / 10) * 10);

    return ['all', ...new Set(decades)];
  });

  protected updateSelectedDecade(decade: string): void {
    this.selectedDecade.set(decade);
  }

  protected readonly resultsSummary = computed(() =>{
    const visible = this.filteredMovies().length;
    const total = this.movies().length;

    return this.hasActiveFilters()
      ? `Mostrando ${visible} de ${total} películas con filtros aplicados`
      : `Mostrando ${visible} de ${total} películas`;
  });
}
