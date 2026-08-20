import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieListService } from '../../../../core/services/movie-list';
import { MovieService } from '../../../../core/services/movie.service';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-movie-list-detail',
  imports: [RouterLink, CdkDropList, CdkDrag],
  templateUrl: './movie-list-detail.html',
  styleUrl: './movie-list-detail.css',
})
export class MovieListDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly movieListService = inject(MovieListService);
  private readonly movieService = inject(MovieService);

  private readonly listId = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly list = computed(() => 
    this.movieListService.lists().find((list) => list.id === this.listId)
  );

  protected readonly moviesInList = computed(() => {
    const selectedList = this.list();

    if (!selectedList){
      return [];
    }

    return selectedList.movieIds
      .map((movieId) =>
        this.movieService.movies().find((movie) => movie.id === movieId)
      )
      .filter((movie) => movie !== undefined);
  });

  protected removeMovie(movieId: number): void {
    this.movieListService.toggleMovieInList(this.listId, movieId);
  }

  protected dropMovie(event: CdkDragDrop<unknown>): void {
    this.movieListService.reorderMovies(
      this.listId,
      event.previousIndex,
      event.currentIndex
    );
  }
}
