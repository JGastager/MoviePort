<template>
    <div class="movies-page">
        <MediaListing v-if="popularMovies" title="Popular movies" :media="popularMovies.results" type="movie" @load-more="loadMoreMovies" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";

useHead({
    title: `Movies | MoviePort`,
});

const moviesStore = useMoviesStore();
const { fetchPopularMovies } = moviesStore;
const { popularMovies } = storeToRefs(moviesStore);

const currentPage = computed(() => popularMovies.value.page || 1);

await fetchPopularMovies(currentPage.value);

async function loadMoreMovies() {
    await fetchPopularMovies(currentPage.value + 1);
}
</script>
