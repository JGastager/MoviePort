import { defineStore } from 'pinia';

export const useShowsStore = defineStore('showsStore', {
    state: () => ({
        popularShows: [],
        trendingShows: [],
    }),
    actions: {
        async fetchPopularShows() {
            const response = await $fetch('/api/tv/popular');
            this.popularShows = response.results;
        },
        async fetchTrendingShows(timeWindow: string = 'day') {
            const response = await $fetch(`/api/trending/tv/${timeWindow}`);
            this.trendingShows = response.results;
        },
    }
});
