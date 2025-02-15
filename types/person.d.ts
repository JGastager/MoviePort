// Shared base interface for cast & crew members
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

export interface TMDBMovieCast extends TMDBCreditPerson {
    cast_id: number;
    character: string;
    order: number;
}

export interface TMDBTVCast extends TMDBCreditPerson {
    character: string;
    order: number;
}

export interface TMDBCrew extends TMDBCreditPerson {
    department: string;
    job: string;
}

export interface TMDBCredit extends TMDBCreditPerson {
    cast_id?: number;
    character?: string;
    order?: number;
    department?: string;
    job?: string;
}

export interface TMDBMovieCreditsResponse {
    id: number;
    cast: TMDBMovieCast[];
    crew: TMDBCrew[];
}

export interface TMDBTVCreditsResponse {
    id: number;
    cast: TMDBTVCast[];
    crew: TMDBCrew[];
}
