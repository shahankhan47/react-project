import { SearchBarProps } from "../../types";

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleChange}
        />
    );
}
