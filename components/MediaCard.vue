<template>
    <div class="group relative cursor-pointer rounded w-media-card">
        <div class="relative mb-3 aspect-2/3 overflow-hidden card">
            <img v-if="media.poster_path" :src="$getImageUrl(media.poster_path, 'poster', 'w342')" :alt="media.title || media.name" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
            <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                <span v-if="type === 'tv'" class="i-ph-television-simple-thin size-18 text-muted" />
                <span v-else class="i-ph-film-strip-thin size-18 text-muted" />
            </div>
            <div class="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div class="i-ph-arrow-square-in-bold size-6" />
            </div>
        </div>
        <div class="min-h-26.5">
            <h3 class="mb-0.5">{{ media.title || media.name }}</h3>
            <span v-if="media.release_date || media.first_air_date" class="text-muted">{{ $dayjs(media.release_date || media.first_air_date).get("year") }}</span>
            <Rating :tmdb-id="media.id" :type="type" :rating="media.vote_average" />
        </div>
        <NuxtLink :to="`/${type}/${media.id}`" class="absolute inset-0 z-10" />
    </div>
</template>

<script lang="ts" setup>
import type { TMDBMovieBase } from "~/types/movieDetails";
import type { TMDBTvShowBase } from "~/types/tvshowDetails";

const _props = defineProps<{
    type: "movie" | "tv";
    media: TMDBMovieBase | TMDBTvShowBase;
}>();
</script>
