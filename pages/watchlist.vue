<template>
    <div>
        <div v-if="isLoggedIn">
            <div v-if="watchlistMovies?.results?.length" class="watchlistMovies">
                <MovieListings title="Watchlisted Movies" :movies="watchlistMovies.results.reverse()" />
            </div>
            <div class="grid grid-cols-7 gap">
                <AverageRating type="tv" title="Average TV Show Ratings" class="col-span-3 mb-10" />
            </div>
            <div v-if="watchlistTVShows?.results?.length" class="watchlistTVShows">
                <ShowListings title="Watchlisted TV Shows" :shows="watchlistTVShows.results.reverse()" />
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
