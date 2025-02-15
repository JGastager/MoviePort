<template>
    <div>
        <MovieListings v-if="popularMovies" title="Popular movies" :movies="popularMovies.results as TMDBSimilarMovie[]" @load-more="loadMoreMovies" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";
import type { TMDBSimilarMovie } from "~/types/movieDetails";

useHead({
    title: `Movies | MoviePort`,
});

const moviesStore = useMoviesStore();
const { fetchPopularMovies } = moviesStore;
const { popularMovies } = storeToRefs(moviesStore);

const currentPage = ref(1);

onMounted(async () => {
    try {
        await fetchPopularMovies(currentPage.value);
    } catch (error) {
        console.error(error);
    }
});

async function loadMoreMovies() {
    currentPage.value++;
    await fetchPopularMovies(currentPage.value);
}
</script>
