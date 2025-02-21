<template>
    <div>
        <div v-if="isLoggedIn">
            <div v-if="watchlistMovies?.results?.length" class="watchlistMovies">
                <MediaListings title="Watchlisted Movies" :media="watchlistMovies.results.reverse()" type="movie" />
            </div>
            <div v-if="watchlistTVShows?.results?.length" class="watchlistTVShows">
                <MediaListings title="Watchlisted TV Shows" :media="watchlistTVShows.results.reverse()" type="tv" />
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
