import { defineStore } from "pinia";
import type { TMDBImagesResponse, TMDBVideosResponse } from "~/types/general";
import type { TMDBPopularTvShowsResponse } from "~/types/tvshowDetails";

export const useShowsStore = defineStore("showsStore", {
    state: () => ({
        popularShows: {} as TMDBPopularTvShowsResponse,
        trendingShows: {} as TMDBPopularTvShowsResponse,
        tvShowImages: {} as TMDBImagesResponse,
        tvShowVideos: {} as TMDBVideosResponse,
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
        async fetchTvShowImages(movieId: number) {
            this.tvShowImages = await $fetch<TMDBImagesResponse>(`/api/tv/${movieId}/images`);
        },
        async fetchTvShowVideos(movieId: number) {
            this.tvShowVideos = await $fetch<TMDBVideosResponse>(`/api/tv/${movieId}/videos`);
        },
    },
});
