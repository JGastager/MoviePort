<template>
    <div>
        <MovieListings title="Popular movies" :movies="movies.results" />
        <pre>{{ movies }}</pre>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const movies = ref({ results: [] });
const { fetchTMDB } = useTMDB();  // Use the composable

onMounted(async () => {
    try {
        const response = await fetchTMDB('/movie/popular');  // TMDB v3 endpoint for popular movies
        movies.value = response;
        console.log('Popular movies:', movies.value);
    } catch (error) {
        console.error('Error loading popular movies:', error);
    }
});
</script>

<style>

</style>