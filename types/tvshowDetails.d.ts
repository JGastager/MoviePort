export interface TMDBTvShowBase {
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}

export interface TMDBTrendingTvShow extends TMDBTvShowBase {
    media_type: string;
    adult: boolean;
}

export interface TMDBPopularTvShowsResponse {
    page: number;
    results: TMDBTvShowBase[];
    total_pages: number;
    total_results: number;
}

export interface TMDBTrendingTvShowsResponse {
    page: number;
    results: TMDBTrendingTvShow[];
    total_pages: number;
    total_results: number;
}
