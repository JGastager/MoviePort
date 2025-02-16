<template>
    <div>
        <div v-if="isLoggedIn">
            <div v-if="favoriteMovies?.results?.length" class="favoriteMovies">
                <MovieListings title="Favorite Movies" :movies="favoriteMovies.results.reverse()" />
            </div>
            <div v-if="favoriteTVShows?.results?.length" class="favoriteTVShows">
                <ShowListings title="Favorite TV Shows" :shows="favoriteTVShows.results.reverse()" />
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
