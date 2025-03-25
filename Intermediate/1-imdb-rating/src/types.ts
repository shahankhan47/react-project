export type Movies = {
    movies: MovieProp[];
};

export type MovieProp = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime?: string;
    imdbRating?: string;
    userRating?: string;
};

export type NumResultsProps = {
    length: number;
};

export type DisplayProps = {
    watched: MovieProp[];
    avgImdbRating: string;
    avgUserRating: string;
    avgRuntime: number;
};

export type SearchBarProps = {
    query: string;
    setQuery: Function;
};

export type SelectedMovieProp = {
    Title: string;
    Year: string;
    Poster: string;
    Runtime: string;
    imdbRating: string;
    Plot: string;
    Released: string;
    Actors: string;
    Director: string;
    Genre: string;
};
