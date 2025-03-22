export type Movies = {
    movies: MovieProp[];
};

export type MovieProp = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime?: number;
    imdbRating?: number;
    userRating?: number;
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
