import { ReactNode } from "react";

export default function WatchedMovies({ myElement }: { myElement: ReactNode }) {
    return <ul className="list">{myElement}</ul>;
}
