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

  protected readonly editingListId = signal<number | null>(null);

  protected readonly listName = signal('');
  protected readonly listDescription = signal('');
  protected readonly editName = signal('');
  protected readonly editDescription = signal('');

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

  protected startEditing(listId: number, name: string, description?: string): void {
    this.editingListId.set(listId);
    this.editName.set(name);
    this.editDescription.set(description ?? '');
  }

  protected cancelEditing(): void {
    this.editingListId.set(null);
    this.editName.set('');
    this.editDescription.set('');
  }

  protected saveEditing(): void {
    const listId = this.editingListId();

    if (listId === null){
      return;
    }

    this.movieListService.updateList(
      listId,
      this.editName(),
      this.editDescription()
    );

    this.cancelEditing();
  }
}
