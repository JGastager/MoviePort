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
        async fetchPopularShows(page = 1) {
            try {
                const response = await $fetch<TMDBPopularTvShowsResponse>("/api/tv/popular", {
                    query: { page },
                });

                if (page === 1) {
                    this.popularShows = response;
                } else {
                    this.popularShows = {
                        ...response,
                        results: [...this.popularShows.results, ...response.results],
                    };
                }
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            }
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
            if (this.tvShowDetails.id === showId) {
                console.log(`✅ Successfully loaded TV show details ${showId} from store.`);
            } else {
                try {
                    this.tvShowDetails = await $fetch<TMDBTVShowDetails>(`/api/tv/${showId}`, {
                        query: { append_to_response: "translations" },
                    });
                    console.log(`✅ Fetched TV show details ${showId}`);
                } catch (error) {
                    console.error(`❌ Error fetching TV show details ${showId}:`, error);
                }
            }
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
