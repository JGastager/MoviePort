import { defineStore } from "pinia";
import type {
    AccountDetails,
    CreateSessionWithLogin,
    CreateSession,
    CreateRequestToken,
    DeleteSession,
    RatedMovieResponse,
    RatedTvShowResponse,
    MovieWatchlistResponse,
    TvShowWatchlistResponse,
    FavoriteMoviesResponse,
    FavoriteTVShowsResponse,
} from "~/types/account";

export const useAccountStore = defineStore("accountStore", {
    state: () => ({
        requestToken: "" as string,
        sessionId: "" as string,
        accountDetails: {} as AccountDetails,
        favoriteMovies: {} as FavoriteMoviesResponse,
        favoriteTVShows: {} as FavoriteTVShowsResponse,
        ratedMovies: {} as RatedMovieResponse,
        ratedTVShows: {} as RatedTvShowResponse,
        watchlistMovies: {} as MovieWatchlistResponse,
        watchlistTVShows: {} as TvShowWatchlistResponse,
    }),
    getters: {
        isLoggedIn(): boolean {
            return !!this.sessionId;
        },

        getUserInfo(): AccountDetails | null {
            return this.isLoggedIn ? this.accountDetails : null;
        },
    },
    actions: {
        async login(username: string, password: string) {
            const requestToken: CreateRequestToken = await this.createRequestToken();
            const requestBody = {
                username,
                password,
                request_token: requestToken.request_token,
            };

            try {
                // Step 1: Validate Login
                const loginResponse = await $fetch<CreateSessionWithLogin>("/api/authentication/token/validate_with_login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: requestBody,
                });

                if (!loginResponse.success) throw new Error("Login failed");

                this.requestToken = loginResponse.request_token;

                // Step 2: Create Session ID
                const sessionResponse = await $fetch<CreateSession>("/api/authentication/session/new", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: { request_token: loginResponse.request_token },
                });

                if (!sessionResponse.success) throw new Error("Failed to create session");

                this.sessionId = sessionResponse.session_id;
                localStorage.setItem("tmdb_session_id", sessionResponse.session_id);
                await this.fetchAccountDetails();
            } catch (error) {
                console.error(error);
                throw new Error("Login process failed");
            }
        },
        async createRequestToken() {
            try {
                return await $fetch<CreateRequestToken>("/api/authentication/token/new");
            } catch (error) {
                console.error(error);
                throw new Error("Failed to create request token");
            }
        },
        async logout() {
            try {
                const sessionId = this.sessionId;
                if (!sessionId) throw new Error("No session ID found");

                await $fetch<DeleteSession>("/api/authentication/session", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: { session_id: sessionId },
                });

                localStorage.removeItem("tmdb_session_id");
                this.sessionId = "";
                this.accountDetails = {} as AccountDetails;
            } catch (error) {
                console.error(error);
                throw new Error("Logout failed");
            }
        },
        async fetchAccountDetails() {
            try {
                const sessionId = this.sessionId;
                if (!sessionId) throw new Error("No session ID found");

                const response: AccountDetails = await $fetch("/api/account", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-tmdb-session-id": sessionId, // Send session_id in header
                    },
                });

                this.accountDetails = response;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to fetch account details");
            }
        },

        async fetchFavoriteMovies() {
            const sessionId = this.sessionId;
            if (!sessionId || !this.accountDetails?.id) return;
            this.favoriteMovies = await $fetch<FavoriteMoviesResponse>(`/api/account/${this.accountDetails.id}/favorite/movies`, {
                headers: { "x-tmdb-session-id": sessionId },
            });
        },

        async fetchFavoriteTVShows() {
            const sessionId = this.sessionId;
            if (!sessionId || !this.accountDetails?.id) return;
            this.favoriteTVShows = await $fetch<FavoriteTVShowsResponse>(`/api/account/${this.accountDetails.id}/favorite/tv`, {
                headers: { "x-tmdb-session-id": sessionId },
            });
        },

        async fetchRatedMovies() {
            const sessionId = this.sessionId;
            if (!sessionId || !this.accountDetails?.id) return;
            this.ratedMovies = await $fetch<RatedMovieResponse>(`/api/account/${this.accountDetails.id}/rated/movies`, {
                headers: { "x-tmdb-session-id": sessionId },
            });
        },

        async fetchRatedTVShows() {
            const sessionId = this.sessionId;
            if (!sessionId || !this.accountDetails?.id) return;
            this.ratedTVShows = await $fetch<RatedTvShowResponse>(`/api/account/${this.accountDetails.id}/rated/tv`, {
                headers: { "x-tmdb-session-id": sessionId },
            });
        },

        async fetchWatchlistMovies() {
            const sessionId = this.sessionId;
            if (!sessionId || !this.accountDetails?.id) return;
            this.watchlistMovies = await $fetch<MovieWatchlistResponse>(`/api/account/${this.accountDetails.id}/watchlist/movies`, {
                headers: { "x-tmdb-session-id": sessionId },
            });
        },

        async fetchWatchlistTVShows() {
            const sessionId = this.sessionId;
            if (!sessionId || !this.accountDetails?.id) return;
            this.watchlistTVShows = await $fetch<TvShowWatchlistResponse>(`/api/account/${this.accountDetails.id}/watchlist/tv`, {
                headers: { "x-tmdb-session-id": sessionId },
            });
        },

        async addRating(type: "movie" | "tv", id: number, rating: number) {
            const sessionId = this.sessionId;
            if (!sessionId || !this.accountDetails?.id) return;

            try {
                await $fetch<TvShowWatchlistResponse>(`/api/${type}/${id}/rating`, {
                    method: "POST",
                    headers: { "x-tmdb-session-id": sessionId },
                    body: { value: rating * 2 },
                });
                console.log(`✅ Rating added for ${type} ${id} with ${rating} stars.`);

                await new Promise((resolve) => setTimeout(resolve, 3000));

                if (type === "movie") {
                    await this.fetchRatedMovies();
                    console.log("✅ Fetched updated rated movies.", this.ratedMovies);
                } else {
                    await this.fetchRatedTVShows();
                    console.log("✅ Fetched updated rated TV shows.", this.ratedTVShows);
                }
            } catch (error) {
                console.error(`❌ Failed to add rating for ${type} ${id}:`, error);
            }
        },

        async initializeAccountStore() {
            console.log("🔄 Checking for existing session...");

            this.sessionId = localStorage.getItem("tmdb_session_id") || "";

            if (!this.sessionId) {
                console.log("❌ No session ID found. User is not logged in.");
                return;
            }

            try {
                console.log("✅ Session found! Fetching account details...");
                await this.fetchAccountDetails();
                await this.fetchFavoriteMovies();
                await this.fetchFavoriteTVShows();
                await this.fetchRatedMovies();
                await this.fetchRatedTVShows();
                await this.fetchWatchlistMovies();
                await this.fetchWatchlistTVShows();
                console.log("✅ Account details loaded:", this.accountDetails);
            } catch (error) {
                console.error("❌ Failed to restore account:", error);
            }
        },
    },
});
