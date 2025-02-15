export interface TMDBMovieBase {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    original_language: string;
    overview: string;
    poster_path: string | null;
    popularity: number;
    vote_average: number;
    vote_count: number;
    title: string;
    original_title: string;
    release_date: string;
    video: boolean;
    genre_ids: number[];
}

export interface TMDBTrendingMovie extends TMDBMovieBase {
    media_type: string;
}

export interface TMDBPopularMoviesResponse {
    page: number;
    results: TMDBMovieBase[];
    total_pages: number;
    total_results: number;
}

export interface TMDBTrendingMoviesResponse {
    page: number;
    results: TMDBTrendingMovie[];
    total_pages: number;
    total_results: number;
}

export interface TMDBGenre {
    id: number;
    name: string;
}

export interface TMDBProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface TMDBProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface TMDBSpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface TMDBMovieDetailsResponse extends TMDBMovieBase {
    belongs_to_collection: string | null;
    budget: number;
    genres: TMDBGenre[];
    homepage: string;
    imdb_id: string;
    production_companies: TMDBProductionCompany[];
    production_countries: TMDBProductionCountry[];
    revenue: number;
    runtime: number | null;
    spoken_languages: TMDBSpokenLanguage[];
    status: string;
    tagline: string | null;
}

export interface TMDBPaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface TMDBSimilarMovie extends TMDBMovieBase {
    runtime: number | null;
}

export interface TMDBSimilarMoviesResponse {
    page: number;
    results: TMDBSimilarMovie[];
    total_pages: number;
    total_results: number;
}
