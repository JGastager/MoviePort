<template>
    <div>
        <MovieListings v-if="popularMovies" title="Popular movies" :movies="popularMovies" />
    </div>
</template>

<script lang="ts" setup>
import { useMoviesStore } from '~/store/movies';
import {storeToRefs} from 'pinia';

useHead({
    title: `Movies | MoviePort`,
})

const moviesStore = useMoviesStore();
const {fetchPopularMovies} = moviesStore;
const {popularMovies} = storeToRefs(moviesStore);

onMounted(async () => {
  try {
    await fetchPopularMovies();
  }
  catch (error) {
    console.error(error);
  }
})
</script>

<style>

</style>