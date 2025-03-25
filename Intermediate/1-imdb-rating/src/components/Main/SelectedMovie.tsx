import { useEffect, useState } from "react";
import { MovieProp, SelectedMovieProp } from "../../types";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader";

const KEY = "254f3c70";
const URL = `http://www.omdbapi.com/?apikey=${KEY}&`;

export default function SelectedMovie({
    id,
    onCloseMovie,
    onAddWatched,
    watched,
}: {
    id: string;
    onCloseMovie: Function;
    onAddWatched: Function;
    watched: MovieProp[];
}) {
    const [isLoading, setIsloading] = useState(false);
    const [userRating, setUserRating] = useState("");
    const [movie, setMovie] = useState<SelectedMovieProp>({
        Title: "",
        Year: "",
        Poster: "",
        Runtime: "",
        imdbRating: "",
        Plot: "",
        Released: "",
        Actors: "",
        Director: "",
        Genre: "",
    });

    useEffect(() => {
        if (!movie?.Title) {
            return;
        }
        document.title = `Movie | ${movie?.Title}`;

        // Cleanup Function - React Specific - Very Important:
        return function () {
            document.title = `OMDB Rating`;
        };
    }, [movie]);

    const isMovieWatched = watched.map((movie) => movie.imdbID).includes(id);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === id
    )?.userRating;

    function handleAdd() {
        const newMovie: MovieProp = {
            imdbID: id,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            runtime: movie.Runtime,
            imdbRating: movie.imdbRating,
            userRating,
        };
        onAddWatched(newMovie);
        onCloseMovie();
    }
    useEffect(() => {
        async function getMovieDetails(id: string) {
            setIsloading(true);
            const url = `${URL}i=${id}`;
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data);
            setIsloading(false);
        }

        getMovieDetails(id);
    }, [id]);

    useEffect(() => {
        const keyPressCallback = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onCloseMovie();
            }
        };
        document.addEventListener("keydown", keyPressCallback);

        // Cleanup is very important when you add an eventListener to a component because if you won't
        // Eveytime the component instance is mouted, it will create a new same eventListener.
        return function () {
            document.removeEventListener("keydown", keyPressCallback);
        };
    }, [onCloseMovie]);
    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button
                            className="btn-back"
                            onClick={() => onCloseMovie()}
                        >
                            &larr;
                        </button>
                        <img
                            src={movie.Poster}
                            alt={`Poster of ${movie.Title}`}
                        />
                        <div className="details-overview">
                            <h2>{movie.Title}</h2>
                            <p>
                                {movie.Released} &bull; {movie.Runtime}
                            </p>
                            <p>{movie.Genre}</p>
                            <p>
                                <span>⭐</span>
                                {movie.imdbRating}
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isMovieWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {Number(userRating) > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            Add To List
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You have already rated this movie{" "}
                                    {watchedUserRating}
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{movie.Plot}</em>
                        </p>
                        <p>Starring {movie.Actors}</p>
                        <p>Directed By: {movie.Director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
