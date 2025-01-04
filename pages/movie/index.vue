<template>
    <div>
        <MovieListings title="Popular movies" :movies="movies.results" />
        <!-- <pre>{{ movies }}</pre> -->
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const movies = ref({ results: [] });
const { fetchTMDB } = useTMDB();  // Use the composable

onMounted(async () => {
    try {
      // TMDB v3 endpoint for popular movies
      movies.value = await fetchTMDB('/movie/popular');
        console.log('Popular movies:', movies.value);
    } catch (error) {
        console.error('Error loading popular movies:', error);
    }
});
</script>

<style>

</style>