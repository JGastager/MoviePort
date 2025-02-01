<template>
    <div>
        <MovieListings title="Trending movies" :movies="movies.results" />
        <!-- <pre>{{ movies }}</pre> -->
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

useHead({
    title: `Movies | MoviePort`,
})

const movies = ref({ results: [] });
const { fetchTMDB } = useTMDB();  // Use the composable

onMounted(async () => {
    try {
        // TMDB v3 endpoint for trending movies
        movies.value = await fetchTMDB('/trending/movie/day');
        console.log('Trending movies:', movies.value);
    } catch (error) {
        console.error('Error loading trending movies:', error);
    }
});
</script>

<style>

</style>