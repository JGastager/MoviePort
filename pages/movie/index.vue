<template>
    <div>
        <MovieListings v-if="trendingMovies" title="Trending movies" :movies="trendingMovies" />
      <pre v-if="trendingMovies">{{trendingMovies}}</pre>
    </div>
</template>

<script lang="ts" setup>
import { useMoviesStore } from '~/store/movies';
import {storeToRefs} from 'pinia';

useHead({
    title: `Movies | MoviePort`,
})


const moviesStore = useMoviesStore();
const {fetchTrendingMovies} = moviesStore;
const {trendingMovies} = storeToRefs(moviesStore);

onMounted(async () => {
  try {
    await fetchTrendingMovies();
  }
  catch (error) {
    console.error(error);
  }
})
</script>

<style>

</style>