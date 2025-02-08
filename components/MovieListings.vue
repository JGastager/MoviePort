<template>
    <div>
        <h2 v-if="title" class="mb-6">{{ title }}</h2>
        <TransitionSlide appear group tag="div" class="grid grid-cols-7 gap">
            <div v-for="(movie, index) in movies" :key="index" class="group relative cursor-pointer rounded">
                <div class="relative mb-3 aspect-2/3 overflow-hidden card">
                    <img v-if="movie.poster_path" :src="$getImageUrl(movie.poster_path, 'poster', 'w342')" :alt="movie.title" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                    <div v-else class="i-ph-film-strip-thin absolute left-1/2 top-1/2 size-18 transform text-muted transition-all duration-300 -translate-x-1/2 -translate-y-1/2 group-hover:scale-102 group-hover:blur-sm"/>
                    <div class="durtation-300 absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <div class="i-ph-arrow-square-in-bold size-6"/>
                    </div>
                </div>
                <h3 class="mb-0.5">{{ movie.title }}</h3>
                <span v-if="movie.release_date" class="text-muted">{{ $dayjs(movie.release_date).get('year')}}</span>
                <span v-if="movie.release_date && movie.runtime" class="text-muted"> • </span>
                <span v-if="movie.runtime" class="text-muted">{{ movie.runtime }} min</span>
                <Rating :tmdb-id="movie.id" type="movie" :rating="movie.vote_average" />
                <NuxtLink :to="'/movie/' + movie.id" class="absolute inset-0 z-10"/>
            </div>
        </TransitionSlide>
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