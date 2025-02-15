interface TMDBSearchResultBase {
    backdrop_path: string;
    id: number;
    original_language: string;
    overview: string;
    poster_path: string;
    media_type: string; // Key field to differentiate between movie, TV show, or person
    popularity: number;
    vote_average: number;
    vote_count: number;
}

interface TMDBSearchMovie extends TMDBSearchResultBase {
    title: string;
    original_title: string;
    genre_ids: number[];
    release_date: string;
    video: boolean;
    adult: boolean;
}
interface TMDBSearchTvShow extends TMDBSearchResultBase {
    name: string;
    original_name: string;
    genre_ids: number[];
    first_air_date: string;
    origin_country: string[];
}
interface TMDBSearchPerson extends TMDBSearchResultBase {
    name: string;
    profile_path: string;
    known_for_department: string;
    known_for: (TMDBSearchMovie | TMDBSearchTvShow)[];
}
export interface TMDBSearchMultiResponse {
    page: number;
    results: (TMDBSearchMovie | TMDBSearchTvShow | TMDBSearchPerson)[];
    total_pages: number;
    total_results: number;
}
