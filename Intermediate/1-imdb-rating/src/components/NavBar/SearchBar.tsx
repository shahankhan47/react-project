import { useEffect, useRef } from "react";
import { SearchBarProps } from "../../types";
import { useKey } from "../../hooks/useKey";

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    // Incorrect way of doing DOM Manipulation in React (Focusing on SearchBar on initial render):
    // useEffect(() => {
    //     const searchbar = document.querySelector(".search");
    //     searchbar?.focus()
    // }, [])

    // To implement above, introducing useRef:
    const searchbar = useRef<HTMLInputElement>(null);
    useEffect(() => {
        searchbar.current?.focus();
    }, []);

    //Using the ref as here:
    // Commented because moved to custom hook - useKey
    // useEffect(() => {
    //     function callback(e: KeyboardEvent) {
    //         if (document.activeElement === searchbar.current) {
    //             return;
    //         }

    //         if (e.code === "Enter") {
    //             searchbar.current?.focus();
    //             setQuery(null);
    //         }
    //     }

    //     document.addEventListener("keydown", callback);
    //     return () => document.removeEventListener("keydown", callback);
    // }, [setQuery]);

    useKey("Enter", () => {
        if (document.activeElement === searchbar.current) return;
        searchbar.current?.focus();
        setQuery(null);
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query || ""}
            onChange={handleChange}
            // useRef usage here:
            ref={searchbar}
        />
    );
}
