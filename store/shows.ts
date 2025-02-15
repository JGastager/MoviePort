import { defineStore } from "pinia";
import type { TMDBImagesResponse, TMDBVideosResponse } from "~/types/general";
import type { TVSeasonDetailsResponse } from "~/types/season";
import type { TMDBPopularTvShowsResponse, TMDBSimilarTvShowsResponse, TMDBTVCreditsResponse, TMDBTVShowDetails } from "~/types/tvshowDetails";

export const useShowsStore = defineStore("showsStore", {
    state: () => ({
        popularShows: {} as TMDBPopularTvShowsResponse,
        trendingShows: {} as TMDBPopularTvShowsResponse,
        tvShowImages: {} as TMDBImagesResponse,
        tvShowVideos: {} as TMDBVideosResponse,
        tvShowDetails: {} as TMDBTVShowDetails,
        tvShowCredits: {} as TMDBTVCreditsResponse,
        tvShowSeasonDetails: {} as TVSeasonDetailsResponse,
        similarTvShows: {} as TMDBSimilarTvShowsResponse,
    }),
    actions: {
        async fetchPopularShows() {
            this.popularShows = await $fetch<TMDBPopularTvShowsResponse>("/api/tv/popular");
        },
        async fetchTrendingShows(timeWindow: string = "day") {
            this.trendingShows = await $fetch<TMDBPopularTvShowsResponse>(`/api/trending/tv/${timeWindow}`);
        },
        async fetchTvShowImages(showId: number) {
            this.tvShowImages = await $fetch<TMDBImagesResponse>(`/api/tv/${showId}/images`);
        },
        async fetchTvShowVideos(showId: number) {
            this.tvShowVideos = await $fetch<TMDBVideosResponse>(`/api/tv/${showId}/videos`);
        },
        async fetchTvShowDetails(showId: number) {
            this.tvShowDetails = await $fetch<TMDBTVShowDetails>(`/api/tv/${showId}`);
        },
        async fetchTvShowCredits(showId: number) {
            this.tvShowCredits = await $fetch<TMDBTVCreditsResponse>(`/api/tv/${showId}/credits`);
        },
        async fetchTvShowSeasonDetails(showId: number, seasonNumber: number) {
            this.tvShowSeasonDetails = await $fetch<TVSeasonDetailsResponse>(`/api/tv/${showId}/season/${seasonNumber}`);
        },
        async fetchSimilarTvShows(showId: number) {
            this.similarTvShows = await $fetch<TMDBSimilarTvShowsResponse>(`/api/tv/${showId}/similar`);
        },
    },
});
