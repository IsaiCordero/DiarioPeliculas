import { computed, effect, Injectable, signal } from '@angular/core';
import { MovieList } from '../models/movie-list.model';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private readonly storageKey = 'movie-app-lists';
  private readonly listsState = signal<MovieList[]>([]);

  readonly lists = computed(() => this.listsState());

  constructor() {
    this.listsState.set(this.loadLists());

    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.listsState()));
    });
  }

  createList(name: string, description?: string): void{
    const trimmedName = name.trim();
    const trimmedDescription = description?.trim();

    if (!trimmedName){
      return;
    }

    const newList: MovieList = {
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription || undefined,
      movieIds: []
    };

    this.listsState.update((lists) => [...lists, newList]);
  }

  deleteList(listId: number): void{
    this.listsState.update((lists) =>
      lists.filter((list) => list.id != listId)
    );
  }

  toggleMovieInList(listId: number, movieId: number): void{
    this.listsState.update((lists) =>
      lists.map((list) => {
        if(list.id != listId){
          return list;
        }

        const hasMovie = list.movieIds.includes(movieId);

        return{
          ...list,
          movieIds: hasMovie
            ? list.movieIds.filter((id) => id !== movieId)
            : [...list.movieIds, movieId],
        };
      })
    );
  }

  private loadLists(): MovieList[] {
    const rawState = localStorage.getItem(this.storageKey);

    if(!rawState){
      return [];
    }

    return JSON.parse(rawState) as MovieList[];
  }
}
