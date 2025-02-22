<template>
    <div class="watchlist-page">
        <div v-if="isLoggedIn">
            <div v-if="watchlistMovies?.results?.length" class="watchlistMovies">
                <MediaListing title="Watchlisted Movies" type="movie" :media="[...watchlistMovies.results].reverse()" />
            </div>
            <div v-if="watchlistTVShows?.results?.length" class="watchlistTVShows">
                <MediaListing title="Watchlisted TV Shows" type="tv" :media="[...watchlistTVShows.results].reverse()" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();
const { watchlistMovies, watchlistTVShows } = storeToRefs(accountStore);

const { fetchWatchlistMovies, fetchWatchlistTVShows, isLoggedIn } = accountStore;

onMounted(async () => {
    try {
        await fetchWatchlistMovies();
        await fetchWatchlistTVShows();
    } catch (error) {
        console.error("Failed to fetch account details:", error);
    }
});
</script>
