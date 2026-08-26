import { computed, effect, Injectable, signal } from "@angular/core";
import { MOVIES } from "../data/movies.mock";
import { Movie } from "../models/movie.model";


@Injectable({
    providedIn: 'root' //Crea una unica instancia del servicio para toda la aplicación
})

//Puede ser inyectada en otros sitios

export class MovieService {

    private readonly moviesState = signal<Movie[]>(MOVIES);
    readonly movies = computed(() => this.moviesState());
    private readonly storageKey = 'movie-app-storage';

    constructor() {
        this.moviesState.set(this.loadMovies());

        effect(() => {
            const moviesState = this.moviesState().map((movie) => ({
                id: movie.id,
                userRating: movie.userRating,
                watched: movie.watched,
                pending: movie.pending,
                review: movie.review,
                watchedDate: movie.watchedDate,
                favorite: movie.favorite
            }));

            localStorage.setItem(this.storageKey, JSON.stringify(moviesState));
        });
    }

    getMovies(): Movie[] {
        return this.moviesState();
    }

    getMovieById(id: number): Movie | undefined {
        return this.moviesState().find((movie) => movie.id === id);
    }

    rateMovie(movieId: number, rating: number): void{
        this.moviesState.update((movies) =>
            movies.map((movie) =>
                movie.id == movieId
                    ? { ...movie, userRating: rating}
                    : movie
            )
        );
    }

    toggleWatched(movieId: number): void {
        this.moviesState.update((movies) =>
            movies.map((movie) => {
                if(movie.id !== movieId){
                    return movie;
                }

                const nextWatched = !movie.watched;

                return{
                    ...movie,
                    watched: nextWatched,
                    watchedDate: nextWatched ? this.getTodayDate() : undefined
                }
            })
        );
    }
    private getTodayDate(): string {
        return new Date().toISOString().slice(0, 10);
    }

    togglePending(movieId: number): void{
        this.moviesState.update((movies) =>
            movies.map((movie) => 
                movie.id == movieId
                    ? {...movie, pending: !movie.pending}
                    : movie
            )
        );
    }

    private loadMovies(): Movie[]{
        const rawState = localStorage.getItem(this.storageKey);

        if(!rawState){
            return MOVIES;
        }

        const savedState = JSON.parse(rawState) as Pick<
            Movie,
            'id' | 'userRating' | 'watched' | 'pending' | 'review' | 'watchedDate' | 'favorite'
        >[];

        return MOVIES.map((movie) => {
            const savedMovie = savedState.find((item) => item.id === movie.id);

            return savedMovie
                ? {
                    ...movie,
                    userRating: savedMovie.userRating,
                    watched: savedMovie.watched,
                    pending: savedMovie.pending,
                    review: savedMovie.review,
                    watchedDate: savedMovie.watchedDate,
                    favorite: savedMovie.favorite
                  }
                : movie;
        });
    }

    updateReview(movieId:number, review: string): void {
        this.moviesState.update((movies) => 
            movies.map((movie) =>
                movie.id === movieId
                    ? {...movie, review }
                    : movie
            )
        );
    }

    updateWatchedDate(movieId: number, watchedDate: string): void{
        this.moviesState.update((movies) =>
            movies.map((movie) =>
                movie.id === movieId
                    ? {
                        ...movie,
                        watchedDate: watchedDate || undefined,
                        watched: Boolean(watchedDate),
                    }
                    : movie
            )
        );
    }

    toggleFavorite(movieId: number){
        this.moviesState.update((movies) => 
            movies.map((movie) => 
                movie.id === movieId
                    ? {...movie, favorite: !movie.favorite}
                    : movie
            )
        );
    }

    resetMovieState(): void{
        localStorage.removeItem(this.storageKey);
        this.moviesState.set(MOVIES);
    }
}
