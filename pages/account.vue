<template>
    <div>
        <div v-if="accountDetails">
            <div class="mb-10 flex items-center gap-8">
                <img v-if="gravatarUrl" class="rounded-full" alt="Avatar" :src="gravatarUrl" />
                <div>
                    <h1 v-if="accountDetails.username" class="mb-3">Hello, {{ accountDetails.username }}</h1>
                    <span v-if="accountDetails.id">
                        Account-ID:
                        <span class="text-muted">{{ accountDetails.id }}</span>
                    </span>
                    <span v-if="accountDetails.iso_3166_1" class="text-muted"> | {{ accountDetails.iso_3166_1 }}</span>
                </div>
                <Logout />
            </div>
            <div class="lists">
                <div v-if="favoriteMovies?.results?.length" class="favoriteMovies">
                    <MediaListings title="Favorite Movies" :media="favoriteMovies.results" type="movie" />
                </div>
                <div v-if="favoriteTVShows?.results?.length" class="favoriteTVShows">
                    <MediaListings title="Favorite TV Shows" :media="favoriteTVShows.results" type="tv" />
                </div>
                <div v-if="ratedMovies?.results?.length" class="ratedMovies">
                    <MediaListings title="Rated Movies" :media="ratedMovies.results" type="movie" />
                </div>
                <div v-if="ratedTVShows?.results?.length" class="ratedTVShows">
                    <MediaListings title="Rated TV Shows" :media="ratedTVShows.results" type="tv" />
                </div>
                <div v-if="watchlistMovies?.results?.length" class="watchlistMovies">
                    <MediaListings title="Watchlist Movies" :media="watchlistMovies.results" type="movie" />
                </div>
                <div v-if="watchlistTVShows?.results?.length" class="watchlistTVShows">
                    <MediaListings title="Watchlist TV Shows" :media="watchlistTVShows.results" type="tv" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();
const { accountDetails, favoriteMovies, favoriteTVShows, ratedMovies, ratedTVShows, watchlistMovies, watchlistTVShows } = storeToRefs(accountStore);

const { fetchAccountDetails, fetchFavoriteMovies, fetchFavoriteTVShows, fetchRatedMovies, fetchRatedTVShows, fetchWatchlistMovies, fetchWatchlistTVShows } = accountStore;

onMounted(async () => {
    try {
        await fetchAccountDetails();
        await fetchFavoriteMovies();
        await fetchFavoriteTVShows();
        await fetchRatedMovies();
        await fetchRatedTVShows();
        await fetchWatchlistMovies();
        await fetchWatchlistTVShows();
    } catch (error) {
        console.error("Failed to fetch account details:", error);
    }
});

const gravatarUrl = computed(() => (accountDetails.value?.avatar?.gravatar?.hash ? `https://www.gravatar.com/avatar/${accountDetails.value.avatar.gravatar.hash}` : null));
</script>
