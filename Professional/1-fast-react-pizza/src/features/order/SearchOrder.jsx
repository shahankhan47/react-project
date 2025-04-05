import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!query) {
            return;
        }
        navigate(`/order/${query}`);
        setQuery("");
    }
    return (
        <form onSubmit={handleSubmit} className="px-4">
            <input
                placeholder="Order No."
                value={query}
                onChange={handleChange}
                className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64
                sm:focus:w-72 transition-all duration-300 outline-none focus:ring-yellow-500 focus:ring-opacity-50"
            />
        </form>
    );
}

export default SearchOrder;
