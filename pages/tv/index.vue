<template>
    <div>
        <ShowListings title="Trending TV shows" :shows="shows.results" />
        <!-- <pre>{{ movies }}</pre> -->
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const shows = ref({ results: [] });
const { fetchTMDB } = useTMDB();  // Use the composable

onMounted(async () => {
    try {
        // TMDB v3 endpoint for trending TV shows
        shows.value = await fetchTMDB('/trending/tv/day');
        console.log('Trending TV shows:', shows.value);
    } catch (error) {
        console.error('Error loading trending TV shows:', error);
    }
});
</script>

<style>

</style>