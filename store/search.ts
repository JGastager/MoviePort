import { defineStore } from "pinia";
import type { TMDBSearchMultiResponse } from "~/types/search";

export const useSearchStore = defineStore("searchStore", {
    state: () => ({
        searchMultiResults: {} as TMDBSearchMultiResponse,
    }),
    actions: {
        async searchMulti(query: string, includeAdult: boolean = false, language: string = "en-US", page: number = 1) {
            this.searchMultiResults = await $fetch<TMDBSearchMultiResponse>(`/api/search/multi?query=${query}&include_adult=${includeAdult}&language=${language}&page=${page}`);
        },
    },
});
