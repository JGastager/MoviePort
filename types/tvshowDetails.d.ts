// Base structure for a person in cast & crew
export interface TMDBCreditPerson {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
}

// Base structure for TV show data
export interface TMDBTvShowBase {
    backdrop_path: string | null;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}

// Generic paginated response type for TV shows
export interface TMDBPaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}
// Extension for Trending TV shows (adds extra fields)
export interface TMDBTrendingTvShow extends TMDBTvShowBase {
    media_type: string;
    adult: boolean;
}

// Responses for different types of TV show lists
export type TMDBPopularTvShowsResponse = TMDBPaginatedResponse<TMDBTvShowBase>;
export type TMDBTrendingTvShowsResponse = TMDBPaginatedResponse<TMDBTrendingTvShow>;
export type TMDBSimilarTvShowsResponse = TMDBPaginatedResponse<TMDBTvShowBase>;

// Cast member for a TV show
export interface TMDBTVCast extends TMDBCreditPerson {
    character: string;
    order: number;
}

// Crew member for a TV show
export interface TMDBTVCrew extends TMDBCreditPerson {
    department: string;
    job: string;
}

// Full credits response
export interface TMDBTVCreditsResponse {
    id: number;
    cast: TMDBTVCast[];
    crew: TMDBTVCrew[];
}
// Creator details
export interface TMDBCreator {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
}

// Genre
export interface TMDBGenre {
    id: number;
    name: string;
}

// Network
export interface TMDBNetwork {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

// Production company
export interface TMDBProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

// Production country
export interface TMDBProductionCountry {
    iso_3166_1: string;
    name: string;
}

// Spoken language
export interface TMDBSpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

// Season details
export interface TMDBSeason {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}

// Last or Next episode info
export interface TMDBEpisode {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
}

// Full TV show details response
export interface TMDBTVShowDetails {
    adult: boolean;
    backdrop_path: string | null;
    created_by: TMDBCreator[];
    episode_run_time: number[];
    name: string;
    first_air_date: string;
    genres: TMDBGenre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: TMDBEpisode | null;
    next_episode_to_air: TMDBEpisode | null;
    networks: TMDBNetwork[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: TMDBProductionCompany[];
    production_countries: TMDBProductionCountry[];
    seasons: TMDBSeason[];
    spoken_languages: TMDBSpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}
