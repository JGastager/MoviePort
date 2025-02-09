import { defineStore } from 'pinia';

export const useAccountStore = defineStore('accountStore', {
    state: () => ({
        requestToken: "" as string,
        sessionId: {} as string,
        accountDetails: {} as UserProfile,
        favoriteMovies: null as any,
        favoriteTVShows: null as any,
        ratedMovies: null as any,
        ratedTVShows: null as any,
        watchlistMovies: null as any,
        watchlistTVShows: null as any,
    }),
    actions: {
        async login(username: string, password: string) {
            const requestToken = await this.createRequestToken();
            const requestBody = { username, password, request_token: requestToken.request_token };

            try {
                // Step 1: Validate Login
                const loginResponse = await $fetch('/api/authentication/token/validate_with_login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });

                if (!loginResponse.success) throw new Error("Login failed");

                this.requestToken = loginResponse.request_token;

                // Step 2: Create Session ID
                const sessionResponse = await $fetch('/api/authentication/session/new', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ request_token: loginResponse.request_token })
                });

                if (!sessionResponse.success) throw new Error("Failed to create session");

                const sessionId = sessionResponse.session_id;
                localStorage.setItem('tmdb_session_id', sessionId);
                this.sessionId = sessionId;

                console.log("Session ID:", sessionId);
            } catch (error) {
                console.error(error);
                throw new Error("Login process failed");
            }
        },
        async createRequestToken() {
            try {
                return await $fetch('/api/authentication/token/new');
            } catch (error) {
                console.error(error);
                throw new Error("Failed to create request token");
            }
        },
        async logout() {
            try {
                const sessionId = localStorage.getItem('tmdb_session_id');
                if (!sessionId) throw new Error("No session ID found");

                await $fetch('/api/authentication/session', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ session_id: sessionId })
                });

                localStorage.removeItem('tmdb_session_id');
                this.sessionId = "";
                this.accountDetails = {};
            } catch (error) {
                console.error(error);
                throw new Error("Logout failed");
            }
        },
        async fetchAccountDetails() {
            try {
                const sessionId = localStorage.getItem('tmdb_session_id');
                if (!sessionId) throw new Error("No session ID found");

                const response = await $fetch('/api/account', { 
                    method: 'GET', 
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-tmdb-session-id': sessionId, // Send session_id in header
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
