<template>
    <div class="ratings-page">
        <div v-if="isLoggedIn">
            <h2 class="mb-6">Average Ratings</h2>
            <div class="grid grid-cols-10 items-center gap">
                <RatingSummary class="col-span-2 mb-10" />
                <RatingAverage class="col-span-2 mb-10" />
            </div>
            <div v-if="ratedMovies?.results?.length" class="ratedMovies">
                <MediaListing title="Rated Movies" type="movie" :media="[...ratedMovies.results].reverse()" />
            </div>
            <div v-if="ratedTVShows?.results?.length" class="ratedTVShows">
                <MediaListing title="Rated TV Shows" type="tv" :media="[...ratedTVShows.results].reverse()" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();

const { ratedMovies, ratedTVShows } = storeToRefs(accountStore);

const { fetchRatedMovies, fetchRatedTVShows, isLoggedIn } = accountStore;

onMounted(async () => {
    try {
        await fetchRatedMovies();
        await fetchRatedTVShows();
    } catch (error) {
        console.error("Failed to fetch account details:", error);
    }
});
</script>
