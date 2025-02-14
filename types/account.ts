export interface Avatar {
    gravatar: {
        hash: string;
    };
    tmdb: {
        avatar_path: string | null;
    };
}

export interface AccountDetails {
    avatar: Avatar;
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
}

export interface CreateSessionWithLogin {
    success: boolean;
    expires_at: string;
    request_token: string;
}

export interface CreateRequestToken {
    success: boolean;
    expires_at: string;
    request_token: string;
}

export interface CreateSession {
    success: boolean;
    session_id: string;
}

export interface DeleteSession {
    success: boolean;
}

// Base structure for paginated responses
export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

// Common properties for both movies and TV shows
export interface MediaItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    rating?: number;
}

// Movie-specific properties
export interface Movie extends MediaItem {
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
}

// TV Show-specific properties
export interface TVShow extends MediaItem {
    origin_country: string[];
    original_name: string;
    first_air_date: string;
    name: string;
}

// Episode-specific properties
export interface Episode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    rating?: number;
}

export type RatedMovieResponse = PaginatedResponse<Movie>;
export type RatedTvShowResponse = PaginatedResponse<TVShow>;
export type RatedEpisodesResponse = PaginatedResponse<Episode>;

// Movie watchlist response
export interface MovieWatchlist {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

// TV show watchlist response
export interface TVShowWatchlist {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
}

// Define paginated responses
export type MovieWatchlistResponse = PaginatedResponse<MovieWatchlist>;
export type TvShowWatchlistResponse = PaginatedResponse<TVShowWatchlist>;

// Favorite movies response
export interface FavoriteMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

// Favorite TV shows response
export interface FavoriteTVShow {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
}

// Define paginated responses
export type FavoriteMoviesResponse = PaginatedResponse<FavoriteMovie>;
export type FavoriteTVShowsResponse = PaginatedResponse<FavoriteTVShow>;
