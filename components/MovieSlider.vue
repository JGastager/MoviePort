<template>
    <div>
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <TransitionScale v-drag-scroll appear group tag="div" class="slider flex items-start overflow-x-auto pb-1 scrollbar-none gap" :class="overflow ? 'overflow px-margin -mx-margin' : 'rounded'">
            <div v-if="before" class="relative flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 !aspect-2/3 w-media-card focus:bg-primary/50 hover:bg-primary/50">
                <span class="size-6" :class="before.icon ? before.icon : 'i-ph-plus-square-bold'" />
                <h3>{{ before.text }}</h3>
                <NuxtLink :to="before.link" class="absolute inset-0 z-10" />
            </div>
            <div v-for="(movie, index) in movies" :key="index" class="group relative cursor-pointer rounded">
                <div class="relative mb-3 aspect-2/3 overflow-hidden card w-media-card">
                    <img v-if="movie.poster_path" :src="$getImageUrl(movie.poster_path, 'poster', 'w342')" :alt="movie.title" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
                    <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                        <span class="i-ph-film-strip-thin size-18 text-muted" />
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div class="i-ph-arrow-square-in-bold size-6" />
                    </div>
                </div>
                <h3 class="mb-0.5">
                    {{ movie.title }}
                </h3>
                <span v-if="movie.release_date" class="text-muted">{{ $dayjs(movie.release_date).get("year") }}</span>
                <span v-if="movie.release_date && movie.runtime" class="text-muted"> • </span>
                <span v-if="movie.runtime" class="text-muted">{{ movie.runtime }} min</span>
                <Rating :tmdb-id="movie.id" type="movie" :rating="movie.vote_average" />
                <NuxtLink :to="'/movie/' + movie.id" class="absolute inset-0 z-10" />
            </div>
            <div v-if="after" class="relative flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 !aspect-2/3 w-media-card focus:bg-primary/50 hover:bg-primary/50">
                <span class="size-6" :class="after.icon ? after.icon : 'i-ph-plus-square-bold'" />
                <h3>{{ after.text }}</h3>
                <NuxtLink :to="after.link" class="absolute inset-0 z-10" />
            </div>
        </TransitionScale>
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

const _props = defineProps<{
    title?: string;
    movies: Movie[];
    before?: { link: string; text: string; icon?: string };
    after?: { link: string; text: string; icon?: string };
    overflow?: boolean;
}>();
</script>
