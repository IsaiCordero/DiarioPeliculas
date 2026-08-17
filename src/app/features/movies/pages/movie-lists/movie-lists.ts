import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieListService } from '../../../../core/services/movie-list';
import { MovieService } from '../../../../core/services/movie.service';

@Component({
  selector: 'app-movie-lists',
  imports: [RouterLink],
  templateUrl: './movie-lists.html',
  styleUrl: './movie-lists.css',
})
export class MovieLists {
  private readonly movieListService = inject(MovieListService);
  private readonly movieService = inject(MovieService);

  protected readonly lists = this.movieListService.lists;
  protected readonly movies = this.movieService.movies;

  protected readonly listName = signal('');
  protected readonly listDescription = signal('');

  protected createList(): void {
    this.movieListService.createList(this.listName(), this.listDescription());
    this.listName.set('');
    this.listDescription.set('');
  }

  protected deleteList(listId: number): void{
    this.movieListService.deleteList(listId);
  }

  protected getMovieTitle(movieId: number): string {
    return this.movies().find((movie) => movie.id === movieId)?.title ?? 'Película desconocida';
  }
}
