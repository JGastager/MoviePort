import { defineStore } from 'pinia';
import {useRuntimeConfig} from "#app";

const runtimeConfig = useRuntimeConfig();
const BASEURL = runtimeConfig.public.BASE_URL as string;

export const useMoviesStore = defineStore('moviesStore', {
    state: () => ({
        popularMovies: [],
        trendingMovies: [],
    }),
    actions: {
        async fetchPopularMovies() {
            const response = await fetch(BASEURL + '/movie/popular');
            const data = await response.json();
            this.popularMovies = data.results;
        },
        async fetchTrendingMovies(timeWindow: string = 'day') {
            const response = await fetch(BASEURL + '/movie/trending' + timeWindow);
            const data = await response.json();
            this.trendingMovies = data.results
        }
    }
});
