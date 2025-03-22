import { useState } from "react";
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

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr: Array<any>) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);

    const avgImdbRating = Number(
        average(watched.map((movie) => movie.imdbRating))
    ).toFixed(2);
    const avgUserRating = Number(
        average(watched.map((movie) => movie.userRating))
    ).toFixed(2);
    const avgRuntime = Math.round(
        average(watched.map((movie) => movie.runtime))
    );

    return (
        <>
            {/* Eliminated prop drilling problem. Previously the Logo, SearhBar and NumResults were inside NavBar
        Due to which we had to keep passing props. Now we just use {children} in NavBar and set the Logo,
        SearchBar, NumResults inside the NavBar */}
            <NavBar>
                <Logo />
                <SearchBar />
                <NumResults length={movies.length} />
            </NavBar>
            {/* Same for Main - Elimination deeply nested prop drilling problem */}
            <Main>
                {/* After component composition - we found that there were 2 components doing the same thing.
                So we made both as one MoviesBox component */}
                <MoviesBox>
                    <ul className="list">
                        {movies?.map((movie) => (
                            <Movie key={movie.imdbID} movie={movie} />
                        ))}
                    </ul>
                </MoviesBox>
                <MoviesBox>
                    <WatchedSummary
                        watched={watched}
                        avgImdbRating={avgImdbRating}
                        avgRuntime={avgRuntime}
                        avgUserRating={avgUserRating}
                    />
                    {/* Using explicit prop instead of children */}
                    <WatchedMovies
                        myElement={watched.map((movie) => (
                            <Movie key={movie.imdbID} movie={movie} />
                        ))}
                    />
                </MoviesBox>
            </Main>
        </>
    );
}

export default App;
