import { NumResultsProps } from "../../types";

export default function NumResults({ length }: NumResultsProps) {
    return (
        <p className="num-results">
            Found <strong>{length}</strong> results
        </p>
    );
}
