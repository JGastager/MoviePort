import { defineStore } from "pinia";
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
    }),
    actions: {
        async fetchPopularMovies(page = 1) {
            try {
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
            } catch (error) {
                console.error("Error fetching movies:", error);
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
        async fetchMovieDetails(movieId: number) {
            this.movieDetails = await $fetch<TMDBMovieDetailsResponse>(`/api/movie/${movieId}`);
        },
        async fetchMovieCredits(movieId: number) {
            this.movieCredits = await $fetch<TMDBMovieCreditsResponse>(`/api/movie/${movieId}/credits`);
        },
        async fetchSimilarMovies(movieId: number) {
            this.similarMovies = await $fetch<TMDBSimilarMoviesResponse>(`/api/movie/${movieId}/similar`);
        },
    },
});
