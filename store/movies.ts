import { defineStore } from "pinia";
import type { TMDBImagesResponse, TMDBVideosResponse } from "~/types/general";
import type { TMDBPopularMoviesResponse, TMDBTrendingMoviesResponse } from "~/types/movieDetails";

export const useMoviesStore = defineStore("moviesStore", {
    state: () => ({
        popularMovies: {} as TMDBPopularMoviesResponse,
        trendingMovies: {} as TMDBTrendingMoviesResponse,
        movieImages: {} as TMDBImagesResponse,
        movieVideos: {} as TMDBVideosResponse,
    }),
    actions: {
        async fetchPopularMovies() {
            const response = await $fetch<TMDBPopularMoviesResponse>("/api/movie/popular");
            this.popularMovies = response;
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
    },
});
