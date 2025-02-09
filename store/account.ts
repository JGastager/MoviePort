import { defineStore } from 'pinia';

export const useAccountStore = defineStore('accountStore', {
    state: () => ({
        request_token: "" as string,
        user: {} as { session_id?: string },
        accountDetails: {} as UserProfile,
        favoriteMovies: null as any,
        favoriteTVShows: null as any,
        ratedMovies: null as any,
        ratedTVShows: null as any,
        watchlistMovies: null as any,
        watchlistTVShows: null as any,
    }),
    actions: {
        async fetchAccountDetails() {
            try {
                const sessionId = localStorage.getItem('tmdb_session_id');
                if (!sessionId) throw new Error("No session ID found");

                const response = await $fetch('/api/account', { 
                    method: 'GET', 
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-tmdb-session-id': sessionId,
                    }
                });

                this.accountDetails = response;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to fetch account details");
            }
        },

        async fetchFavoriteMovies() {
            const sessionId = localStorage.getItem('tmdb_session_id');
            if (!sessionId || !this.accountDetails.id) return;
            this.favoriteMovies = await $fetch(`/api/account/${this.accountDetails.id}/favorite/movies`, {
                headers: { 'x-tmdb-session-id': sessionId }
            });
        },

        async fetchFavoriteTVShows() {
            const sessionId = localStorage.getItem('tmdb_session_id');
            if (!sessionId || !this.accountDetails.id) return;
            this.favoriteTVShows = await $fetch(`/api/account/${this.accountDetails.id}/favorite/tv`, {
                headers: { 'x-tmdb-session-id': sessionId }
            });
        },

        async fetchRatedMovies() {
            const sessionId = localStorage.getItem('tmdb_session_id');
            if (!sessionId || !this.accountDetails.id) return;
            this.ratedMovies = await $fetch(`/api/account/${this.accountDetails.id}/rated/movies`, {
                headers: { 'x-tmdb-session-id': sessionId }
            });
        },

        async fetchRatedTVShows() {
            const sessionId = localStorage.getItem('tmdb_session_id');
            if (!sessionId || !this.accountDetails.id) return;
            this.ratedTVShows = await $fetch(`/api/account/${this.accountDetails.id}/rated/tv`, {
                headers: { 'x-tmdb-session-id': sessionId }
            });
        },

        async fetchWatchlistMovies() {
            const sessionId = localStorage.getItem('tmdb_session_id');
            if (!sessionId || !this.accountDetails.id) return;
            this.watchlistMovies = await $fetch(`/api/account/${this.accountDetails.id}/watchlist/movies`, {
                headers: { 'x-tmdb-session-id': sessionId }
            });
        },

        async fetchWatchlistTVShows() {
            const sessionId = localStorage.getItem('tmdb_session_id');
            if (!sessionId || !this.accountDetails.id) return;
            this.watchlistTVShows = await $fetch(`/api/account/${this.accountDetails.id}/watchlist/tv`, {
                headers: { 'x-tmdb-session-id': sessionId }
            });
        },
    }
});
