import { defineStore } from "pinia";
import { useAccountStore } from "./account";
import type { TMDBImagesResponse, TMDBVideosResponse } from "~/types/general";
import type { TMDBPopularMoviesResponse, TMDBTrendingMoviesResponse, TMDBMovieDetailsResponse, TMDBSimilarMoviesResponse } from "~/types/movieDetails";
import type { TMDBMovieCreditsResponse } from "~/types/person";

export const useMoviesStore = defineStore("moviesStore", {
    state: () => ({
        popularMovies: {} as TMDBPopularMoviesResponse,
        trendingMovies: {} as TMDBTrendingMoviesResponse,
        movieImages: {} as TMDBImagesResponse,
        movieVideos: {} as TMDBVideosResponse,
        movieDetails: {} as TMDBMovieDetailsResponse,
        movieCredits: {} as TMDBMovieCreditsResponse,
        similarMovies: {} as TMDBSimilarMoviesResponse,
        movieProviders: {} as TMDBProviders,
        // accountStatesCache: {} as Record<number, any>, // Cache for account states
    }),
    actions: {
        async fetchPopularMovies(page = 1) {
            try {
                console.time("fetchPopularMovies"); // Start timer for the entire method

                const response = await $fetch<TMDBPopularMoviesResponse>("/api/movie/popular", {
                    query: { page },
                });

                if (page === 1) {
                    this.popularMovies = response;
                } else {
                    this.popularMovies = {
                        ...response,
                        results: [...this.popularMovies.results, ...response.results],
                    };
                }

                // Initialize cache if not already present
                /*   if (!this.accountStatesCache) {
                    this.accountStatesCache = {};
                }

                console.time("fetchAccountStates"); // Start timer for fetching account states
                // Fetch account states for each movie in the response
                 for (const movie of response.results) {
                    if (!this.accountStatesCache[movie.id]) {
                        try {
                            const accountState = await $fetch(`/api/movie/${movie.id}/account_states`);
                            this.accountStatesCache[movie.id] = accountState; // Cache the result
                        } catch (error) {
                            console.error(`Error fetching account states for movie ${movie.id}:`, error);
                        }
                    }
                }
                console.timeEnd("fetchAccountStates"); // End timer for fetching account states

                console.log(this.accountStatesCache);
                console.timeEnd("fetchPopularMovies"); // End timer for the entire method */
            } catch (error) {
                console.error("Error fetching popular movies:", error);
                console.timeEnd("fetchPopularMovies"); // Ensure timer ends even if an error occurs
            }
        },
        async fetchTrendingMovies(timeWindow: string = "day") {
            const response = await $fetch<TMDBTrendingMoviesResponse>(`/api/trending/movie/${timeWindow}`);
            this.trendingMovies = response;
        },
        async fetchMovieImages(movieId: number) {
            this.movieImages = await $fetch<TMDBImagesResponse>(`/api/movie/${movieId}/images`);
        },
        async fetchMovieVideos(movieId: number) {
            this.movieVideos = await $fetch<TMDBVideosResponse>(`/api/movie/${movieId}/videos`);
        },
        async fetchMovieProviders(movieId: number) {
            this.movieProviders = await $fetch<TMDBProvidersResponse>(`/api/movie/${movieId}/watch/providers`);
        },
        async fetchMovieDetails(movieId: number) {
            const accountStore = useAccountStore(); // Access accountStore
            const sessionId = accountStore.sessionId; // Directly get sessionId

            if (this.movieDetails.id === movieId) {
                console.log(`✅ Successfully loaded movie details ${movieId} from store.`);
            } else {
                try {
                    this.movieDetails = await $fetch<TMDBMovieDetailsResponse>(`/api/movie/${movieId}`, {
                        query: { append_to_response: "translations,account_states" },
                        headers: {
                            "Content-Type": "application/json",
                            "x-tmdb-session-id": sessionId, // Use sessionId from accountStore
                        },
                    });
                    console.log(`✅ Fetched movie details ${movieId}`);
                } catch (error) {
                    console.error(`❌ Error fetching movie details ${movieId}:`, error);
                }
            }
        },
        async fetchMovieCredits(movieId: number) {
            this.movieCredits = await $fetch<TMDBMovieCreditsResponse>(`/api/movie/${movieId}/credits`);
        },
        async fetchSimilarMovies(movieId: number, page = 1) {
            try {
                const response = await $fetch<TMDBSimilarMoviesResponse>(`/api/movie/${movieId}/similar`, {
                    query: { page },
                });

                if (page === 1) {
                    this.similarMovies = response;
                } else {
                    this.similarMovies = {
                        ...response,
                        results: [...this.similarMovies.results, ...response.results],
                    };
                }
            } catch (error) {
                console.error("Error fetching similar movies:", error);
            }
        },
    },
});
