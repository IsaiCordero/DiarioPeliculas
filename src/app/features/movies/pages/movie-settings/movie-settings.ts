import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieListService } from '../../../../core/services/movie-list';
import { MovieBackup } from '../../../../core/models/movie-backup.model';
import { isMovieList } from '../../../../core/utils/movie-list-validator';
import { isMoviePersonalState } from '../../../../core/utils/movie-personal-state-validator';

@Component({
  selector: 'app-movie-settings',
  imports: [],
  templateUrl: './movie-settings.html',
  styleUrl: './movie-settings.css',
})
export class MovieSettings {
  private readonly movieService = inject(MovieService);
  private readonly movieListService = inject(MovieListService);

  protected readonly isConfirmingReset = signal(false);
  protected readonly importError = signal<string | undefined>(undefined);
  protected readonly importSuccess = signal<string | undefined>(undefined);

  protected askResetConfirmation(): void {
    this.isConfirmingReset.set(true);
  }

  protected cancelReset(): void {
    this.isConfirmingReset.set(false);
  }

  protected confirmReset(): void {
    this.movieService.resetMovieState();
    this.movieListService.resetLists();
    this.isConfirmingReset.set(false);
  }

  protected exportBackup(): void{
    const backup: MovieBackup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      movies: this.movieService.movies()
      .filter((movie)=>
        movie.userRating !== undefined ||
        movie.watched ||
        movie.pending ||
        movie.favorite ||
        movie.review ||
        movie.watchedDate
      )
      .map((movie) => ({
        id: movie.id,
        userRating: movie.userRating,
        watched: movie.watched,
        pending: movie.pending,
        favorite: movie.favorite,
        review: movie.review,
        watchedDate: movie.watchedDate
      })),
      lists: this.movieListService.lists(),
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `peliculas-backup-${backup.exportedAt.slice(0,10)}.json`;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  protected async importBackup(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if(!file){
      return;
    }

    this.importError.set(undefined);
    this.importSuccess.set(undefined);

    try{
      const content = await file.text();
      const parsedBackup: unknown = JSON.parse(content);

      if(!this.isMovieBackup(parsedBackup)){
        this.importError.set('El archivo no tiene el formato correcto.');
        return;
      }

      const shouldImport = confirm(
        'Importar este backup sustituirá tus datos actuales. ¿Quieres continuar?'
      );

      if(!shouldImport){
        return;
      }

      this.movieService.restoreMovieState(parsedBackup.movies);
      this.movieListService.restoreLists(parsedBackup.lists);

      this.importSuccess.set('Copia de seguridad importada correctamente.');
    } catch {
      this.importError.set('No se pudo leer el archivo correctamente.');
    } finally {
      input.value = '';
    }
  }

  private isMovieBackup(value: unknown): value is MovieBackup{
    if(!value || typeof value !== 'object'){
      return false;
    }

    const backup = value as Partial<MovieBackup>;

    return (
      backup.version === 1 &&
      typeof backup.exportedAt === 'string' &&
      Array.isArray(backup.movies) &&
      Array.isArray(backup.lists) &&
      backup.movies.every(isMoviePersonalState) &&
      backup.lists.every(isMovieList)
    );
  }
}
