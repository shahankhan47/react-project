import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Logo from "./components/NavBar/Logo";
import SearchBar from "./components/NavBar/SearchBar";
import NumResults from "./components/NavBar/NumResults";
import MoviesBox from "./components/Main/MoviesBox";
import WatchedSummary from "./components/Main/WatchedSummary";
import WatchedMovies from "./components/Main/WatchedMovies";
import Movie from "./components/Main/Movie";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import { MovieProp } from "./types";
import SelectedMovie from "./components/Main/SelectedMovie";

const KEY = "254f3c70";
const URL = `http://www.omdbapi.com/?apikey=${KEY}&`;

const average = (arr: Array<any>) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
    const [movies, setMovies] = useState<MovieProp[]>([]);
    const [watched, setWatched] = useState<MovieProp[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string>("");

    const avgImdbRating = Number(
        average(watched.map((movie: MovieProp) => Number(movie.imdbRating)))
    ).toFixed(2);
    const avgUserRating = Number(
        average(watched.map((movie: MovieProp) => Number(movie.userRating)))
    ).toFixed(2);
    const avgRuntime = Math.round(
        average(watched.map((movie: MovieProp) => Number(movie.runtime)))
    );

    function handleSelectMovie(id: string) {
        setSelectedId((selectedId) => (id === selectedId ? "" : id));
    }

    function handleCloseMovie() {
        setSelectedId("");
    }

    function handleAddedWatched(movie: MovieProp) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDelete(id: string) {
        setWatched((watched) =>
            watched.filter((movie) => movie?.imdbID !== id)
        );
    }

    // ===============================================================================================================
    // DATA FETCHING
    // ===============================================================================================================
    // How not to fetch data and set state:
    // fetch(`${URL}s=interstelar`)
    //     .then((res) => res.json())
    //     .then((data) => setMovies(data.Search));

    // How to fetch data and set state:
    // Dependency array is to add a dependent state when changed, this useEffect should run again.
    // useEffect(() => {
    //     fetch(`${URL}s=inception`)
    //         .then((res) => res.json())
    //         .then((data) => setMovies(data.Search));
    // }, []);

    // Never make the useEffect callback async, instead use an async function inside it:
    useEffect(
        /*async - never do this*/ () => {
            // Cleanup of data fetching - to prevent race conditions.
            const controller = new AbortController();
            async function getMovies() {
                try {
                    setError("");
                    setIsLoading(true);
                    let url = `${URL}s=${query}`;
                    console.log(url);
                    const res = await fetch(url, {
                        signal: controller?.signal,
                    });
                    if (!res.ok) {
                        throw new Error("Something went wrong");
                    }
                    const data = await res.json();
                    if (data.Response === "False") {
                        throw new Error("Movie not found");
                    }
                    setMovies(data.Search);
                    setError("");
                } catch (e: any) {
                    // Cleanup of data fetching - to prevent race conditions.
                    if (e?.name !== "AbortError") {
                        setError(e.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }
            getMovies();
            handleCloseMovie();

            // Cleanup of data fetching - to prevent race conditions.
            return function () {
                controller.abort();
            };
        },
        [query]
    );
    // ===============================================================================================================

    return (
        <>
            {/* Eliminated prop drilling problem. Previously the Logo, SearhBar and NumResults were inside NavBar
        Due to which we had to keep passing props. Now we just use {children} in NavBar and set the Logo,
        SearchBar, NumResults inside the NavBar */}
            <NavBar>
                <Logo />
                <SearchBar query={query} setQuery={setQuery} />
                <NumResults length={movies.length} />
            </NavBar>
            {/* Same for Main - Elimination deeply nested prop drilling problem */}
            <Main>
                {/* After component composition - we found that there were 2 components doing the same thing.
                So we made both as one MoviesBox component */}
                <MoviesBox>
                    {!isLoading && !error && !query && (
                        <h1>Search For a Movie...</h1>
                    )}
                    {isLoading && !error && <Loader />}
                    {!isLoading && !error && (
                        <ul className="list list-movies">
                            {movies?.map((movie: MovieProp) => (
                                <Movie
                                    key={movie.imdbID}
                                    movie={movie}
                                    onSelectMovie={handleSelectMovie}
                                />
                            ))}
                        </ul>
                    )}

                    {error && <ErrorMessage message={error} />}
                </MoviesBox>
                <MoviesBox>
                    {selectedId ? (
                        <SelectedMovie
                            id={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddedWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary
                                watched={watched}
                                avgImdbRating={avgImdbRating}
                                avgRuntime={avgRuntime}
                                avgUserRating={avgUserRating}
                            />
                            <WatchedMovies
                                myElement={watched.map((movie: MovieProp) => (
                                    <Movie
                                        key={movie.imdbID}
                                        movie={movie}
                                        onSelectMovie={handleSelectMovie}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            />
                        </>
                    )}
                </MoviesBox>
            </Main>
        </>
    );
}

export default App;
