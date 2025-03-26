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
import { useMovies } from "./hooks/useMovies";

const average = (arr: Array<any>) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
    const [query, setQuery] = useState<string | null>("");
    const [selectedId, setSelectedId] = useState<string | null>("");

    // Very important - React specific - Never call the function directly if the value is calculated.
    // Instead pass the whole function which is calculating and returning the value.
    // Never do - useState(JSON.parse(String(localStorage.getItem("watched")))
    // This is called lazy evaluation.
    // Function must be pure and accept no arguements. Called only on initial render.
    const [watched, setWatched] = useState<MovieProp[]>(function () {
        const storedValue = localStorage.getItem("watched");
        return storedValue ? JSON.parse(String(storedValue)) : [];
    });

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
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
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
    // Commented because using async/await in another and also transferred to useMovies custom hook.
    // useEffect(() => {
    //     fetch(`${URL}s=inception`)
    //         .then((res) => res.json())
    //         .then((data) => setMovies(data.Search));
    // }, []);

    const { movies, error, isLoading } = useMovies(query, handleCloseMovie);

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify([...watched]));
    }, [watched]);
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
                    {!isLoading && !error && !movies.length && (
                        <h1>Search For a Movie...</h1>
                    )}
                    {isLoading && !error && !movies.length && <Loader />}
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
