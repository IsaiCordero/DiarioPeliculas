import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieListService } from '../../../../core/services/movie-list';
import { MovieService } from '../../../../core/services/movie.service';

@Component({
  selector: 'app-movie-list-detail',
  imports: [RouterLink],
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

    return this.movieService.movies().filter((movie) => 
      selectedList.movieIds.includes(movie.id)
    );
  });

  protected removeMovie(movieId: number): void {
    this.movieListService.toggleMovieInList(this.listId, movieId);
  }
}
