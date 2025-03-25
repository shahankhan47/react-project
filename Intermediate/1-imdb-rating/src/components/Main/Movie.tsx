import { MovieProp } from "../../types";

export default function Movie({
    movie,
    onSelectMovie,
    onDelete,
}: {
    movie: MovieProp;
    onSelectMovie: Function;
    onDelete?: Function;
}) {
    const isRated = movie?.imdbRating || movie?.userRating;
    function handleDeleteMovie() {
        if (onDelete) {
            onDelete(movie?.imdbID);
        }
    }
    return (
        <li
            key={movie.imdbID}
            onClick={() => {
                onSelectMovie(movie.imdbID);
            }}
        >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            {onDelete ? (
                <button className="btn-delete" onClick={handleDeleteMovie}>
                    X
                </button>
            ) : null}
            <div>
                {movie?.Year && (
                    <p>
                        <span>{movie?.Year}</span>
                    </p>
                )}
                {isRated && (
                    <p>
                        <span>⭐️</span>
                        <span>{movie?.imdbRating}</span>
                    </p>
                )}
                {isRated && (
                    <p>
                        <span>🌟</span>
                        <span>{movie?.userRating}</span>
                    </p>
                )}
                {movie?.runtime && (
                    <p>
                        <span>⏳</span>
                        <span>{movie?.runtime}</span>
                    </p>
                )}
            </div>
        </li>
    );
}
