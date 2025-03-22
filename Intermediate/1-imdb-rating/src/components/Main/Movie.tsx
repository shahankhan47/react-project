import { MovieProp } from "../../types";

export default function Movie({ movie }: { movie: MovieProp }) {
    const isRated = movie?.imdbRating || movie?.userRating;
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                {movie?.Year && (
                    <p>
                        <span>{movie.Year}</span>
                    </p>
                )}
                {isRated && (
                    <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                    </p>
                )}
                {isRated && (
                    <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                    </p>
                )}
                {movie?.runtime && (
                    <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                    </p>
                )}
            </div>
        </li>
    );
}
