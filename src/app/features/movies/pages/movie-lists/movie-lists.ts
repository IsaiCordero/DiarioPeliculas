import { Component, computed, inject, signal } from '@angular/core';
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
  protected readonly searchTerm = signal('');
  protected readonly listNameError = signal('');
  protected readonly editNameError = signal('');

  protected createList(): void {
    const name = this.listName().trim();

    if(!name){
      this.listNameError.set('El nombre de la lista es obligatorio');
      return;
    }

    this.movieListService.createList(name, this.listDescription());
    this.listName.set('');
    this.listDescription.set('');
    this.listNameError.set('');
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
    this.editNameError.set('');
  }

  protected cancelEditing(): void {
    this.editingListId.set(null);
    this.editName.set('');
    this.editDescription.set('');
    this.editNameError.set('');
  }

  protected saveEditing(): void {
    const listId = this.editingListId();
    const name = this.editName().trim();

    if (listId === null){
      return;
    }

    if(!name){
      this.editNameError.set('El nombre de la lista es obligatorio');
      return;
    }

    this.movieListService.updateList(
      listId,
      name,
      this.editDescription()
    );

    this.cancelEditing();
  }

  protected readonly filteredLists = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if(!term) {
      return this.lists();
    }

    return this.lists().filter((list) =>
      list.name.toLowerCase().includes(term) ||
      list.description?.toLowerCase().includes(term)
    );
  });

  protected updateListName(value: string): void{
    this.listName.set(value);

    if(this.listNameError()){
      this.listNameError.set('');
    }
  }

  protected updateEditName(value: string): void {
    this.editName.set('');

    if(this.editNameError()){
      this.editNameError.set('');
    }
  }
}
