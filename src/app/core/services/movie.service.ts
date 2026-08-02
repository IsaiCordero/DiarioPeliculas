import { effect, Injectable, signal } from "@angular/core";
import { MOVIES } from "../data/movies.mock";
import { Movie } from "../models/movie.model";


@Injectable({
    providedIn: 'root' //Crea una unica instancia del servicio para toda la aplicación
})

//Puede ser inyectada en otros sitios

export class MovieService {

    private readonly movies = signal<Movie[]>(MOVIES);
    private readonly storageKey = 'movie-app-state';

    constructor() {
        this.movies.set(this.loadMovies());

        effect(() => {
            const moviesState = this.movies().map((movie) => ({
                id: movie.id,
                userRating: movie.userRating,
                watched: movie.watched,
                pending: movie.pending,
            }));

            localStorage.setItem(this.storageKey, JSON.stringify(moviesState));
        });
    }

    getMovies(): Movie[] {
        return this.movies();
    }

    getMovieById(id: number): Movie | undefined {
        return this.movies().find((movie) => movie.id === id);
    }

    rateMovie(movieId: number, rating: number): void{
        this.movies.update((movies) =>
            movies.map((movie) =>
                movie.id == movieId
                    ? { ...movie, userRating: rating}
                    : movie
            )
        );
    }

    toggleWatched(movieId: number): void {
        this.movies.update((movies) =>
            movies.map((movie) =>
                movie.id == movieId
                    ? {...movie, watched: !movie.watched}
                    : movie
            )
        );
    }

    togglePending(movieId: number): void{
        this.movies.update((movies) =>
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
            'id' | 'userRating' | 'watched' | 'pending'
        >[];

        return MOVIES.map((movie) => {
            const savedMovie = savedState.find((item) => item.id === movie.id);

            return savedMovie
                ? {
                    ...movie,
                    userRating: savedMovie.userRating,
                    watched: savedMovie.watched,
                    pending: savedMovie.pending,
                  }
                : movie;
        });
    }
}

//Esto leerá un Mock pero si añado una API se muede modificar facilmente