<template>
    <div class="favorites-page">
        <div v-if="isLoggedIn">
            <div v-if="favoriteMovies?.results?.length" class="favoriteMovies">
                <MediaListing title="Favorite Movies" :media="[...favoriteMovies.results].reverse()" type="movie" />
            </div>
            <div v-if="favoriteTVShows?.results?.length" class="favoriteTVShows">
                <MediaListing title="Favorite TV Shows" :media="[...favoriteTVShows.results].reverse()" type="tv" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();
const { favoriteMovies, favoriteTVShows } = storeToRefs(accountStore);

const { fetchFavoriteMovies, fetchFavoriteTVShows, isLoggedIn } = accountStore;

onMounted(async () => {
    try {
        await fetchFavoriteMovies();
        await fetchFavoriteTVShows();
    } catch (error) {
        console.error("Failed to fetch account details:", error);
    }
});
</script>
