<template>
    <h2 v-if="title" class="mb-6">{{ title }}</h2>
    <div class="grid gap grid-cols-7">
        <div v-for="(movie, index) in movies" :key="index" class="group cursor-pointer">
            <div class="mb-3 aspect-2/3 overflow-hidden card">
                <img :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path" :alt="movie.title" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                <div class="durtation-300 absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div class="i-ph-arrow-square-in-bold size-6"/>
                </div>
            </div>
            <h3 class="mb-0.5">{{ movie.title }}</h3>
            <span v-if="movie.release_date" class="text-muted">{{ movie.release_date}}</span>
            <span v-if="movie.release_date && movie.runtime" class="text-muted"> • </span>
            <span v-if="movie.runtime" class="text-muted">{{ movie.runtime }} min</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Movie {
    id: number;
    title: string;
    release_date: string;
    runtime: number;
    poster_path: string;
}

const props = defineProps<{
    title?: string;
    movies: Movie[];
}>();

</script>

<style>

</style>