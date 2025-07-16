import { defineStore } from "pinia";
import type { TMDBSearchMultiResponse } from "~/types/search";

export const useSearchStore = defineStore("searchStore", {
    state: () => ({
        searchResults: {} as TMDBSearchMultiResponse,
        searchType: "multi" as "multi" | "movie" | "tv" | "person",
        searchQuery: "" as string,
        loading: false,
    }),

    actions: {
        async searchMulti(query: string, includeAdult: boolean = false, language: string = "en-US", page: number = 1) {
            this.searchResults = await $fetch<TMDBSearchMultiResponse>(`/api/search/multi?query=${query}&include_adult=${includeAdult}&language=${language}&page=${page}`);
        },
        async searchMovies(query: string, includeAdult: boolean = false, language: string = "en-US", page: number = 1) {
            this.searchResults = await $fetch<TMDBSearchMultiResponse>(`/api/search/movie?query=${query}&include_adult=${includeAdult}&language=${language}&page=${page}`);
        },
        async searchTV(query: string, includeAdult: boolean = false, language: string = "en-US", page: number = 1) {
            this.searchResults = await $fetch<TMDBSearchMultiResponse>(`/api/search/tv?query=${query}&include_adult=${includeAdult}&language=${language}&page=${page}`);
        },
        async searchPeople(query: string, includeAdult: boolean = false, language: string = "en-US", page: number = 1) {
            this.searchResults = await $fetch<TMDBSearchMultiResponse>(`/api/search/person?query=${query}&include_adult=${includeAdult}&language=${language}&page=${page}`);
        },
        setSearchQuery(query: string | undefined) {
            if (query && this.searchQuery !== query) {
                this.searchQuery = query;
                console.log("🔄 Search query set to:", query);
                this.triggerSearch();
            }
        },
        setSearchType(type: "multi" | "movie" | "tv" | "person" | undefined) {
            if (type && this.searchType !== type) {
                this.searchType = type;
                console.log("🔄 Search type set to:", type);
                this.triggerSearch();
            }
        },
        async triggerSearch() {
            if (!this.searchQuery) return;
            console.log("🔄 Triggering search with query:", this.searchQuery, "and type:", this.searchType);
            this.loading = true;
            try {
                switch (this.searchType) {
                    case "multi":
                        await this.searchMulti(this.searchQuery);
                        break;
                    case "movie":
                        await this.searchMovies(this.searchQuery);
                        break;
                    case "tv":
                        await this.searchTV(this.searchQuery);
                        break;
                    case "person":
                        await this.searchPeople(this.searchQuery);
                        break;
                }
            } finally {
                this.loading = false;
            }
        },
    },
});
