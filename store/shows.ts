import { defineStore } from "pinia";
import type { TMDBPopularTvShowsResponse } from "~/types/tvshowDetails";

export const useShowsStore = defineStore("showsStore", {
    state: () => ({
        popularShows: {} as TMDBPopularTvShowsResponse,
        trendingShows: {} as TMDBPopularTvShowsResponse,
    }),
    actions: {
        async fetchPopularShows() {
            const response = await $fetch<TMDBPopularTvShowsResponse>("/api/tv/popular");
            this.popularShows = response;
        },
        async fetchTrendingShows(timeWindow: string = "day") {
            const response = await $fetch<TMDBPopularTvShowsResponse>(`/api/trending/tv/${timeWindow}`);
            this.trendingShows = response;
        },
    },
});
