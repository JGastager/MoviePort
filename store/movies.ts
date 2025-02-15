import { defineStore } from "pinia";
import type { TMDBPopularMoviesResponse, TMDBTrendingMoviesResponse } from "~/types/movieDetails";

export const useMoviesStore = defineStore("moviesStore", {
    state: () => ({
        popularMovies: {} as TMDBPopularMoviesResponse,
        trendingMovies: {} as TMDBTrendingMoviesResponse,
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
    },
});
