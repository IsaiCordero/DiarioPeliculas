import { Injectable, signal } from "@angular/core";
import { MOVIES } from "../data/movies.mock";
import { Movie } from "../models/movie.model";


@Injectable({
    providedIn: 'root' //Crea una unica instancia del servicio para toda la aplicación
})

//Puede ser inyectada en otros sitios

export class MovieService {

    private readonly movies = signal<Movie[]>(MOVIES);

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
}

//Esto leerá un Mock pero si añado una API se muede modificar facilmente