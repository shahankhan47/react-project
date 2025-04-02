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
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Order No."
                value={query}
                onChange={handleChange}
            />
        </form>
    );
}

export default SearchOrder;
