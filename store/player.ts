import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        play: false,
        tmdbId: null as number | null,
        type: null as string | null,
        season: null as number | null,
        episode: null as number | null,
        selectedProvider: null as unknown,
    }),
    actions: {
        openPlayer(payload: { tmdbId: number; type: string; season?: number; episode?: number; selectedProvider: unknown }) {
            this.play = true;
            this.tmdbId = payload.tmdbId;
            this.type = payload.type;
            this.season = payload.season ?? null;
            this.episode = payload.episode ?? null;
            this.selectedProvider = payload.selectedProvider;
        },
        closePlayer() {
            this.play = false;
            this.tmdbId = null;
            this.type = null;
            this.season = null;
            this.episode = null;
            this.selectedProvider = null;
        },
        reset() {
            this.$reset();
        },
    },
});
