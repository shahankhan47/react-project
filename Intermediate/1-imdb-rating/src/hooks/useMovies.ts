import { useEffect, useState } from "react";
import { MovieProp } from "../types";

const KEY = "254f3c70";
const URL = `http://www.omdbapi.com/?apikey=${KEY}&`;

export function useMovies(query: string | null, callback: Function) {
    const [movies, setMovies] = useState<MovieProp[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Never make the useEffect callback async, instead use an async function inside it:
    useEffect(
        /*async - never do this*/ () => {
            // Cleanup of data fetching - to prevent race conditions.
            const controller = new AbortController();
            async function getMovies() {
                try {
                    setError(null);
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
                    setError(null);
                } catch (e: any) {
                    // Cleanup of data fetching - to prevent race conditions.
                    if (e?.name !== "AbortError") {
                        setError(e.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            if (Number(query?.length) < 3) {
                setMovies([]);
                setError(null);
                return;
            }
            getMovies();
            callback();

            // Cleanup of data fetching - to prevent race conditions.
            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, error, isLoading };
}
