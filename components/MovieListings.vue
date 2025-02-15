<template>
    <div>
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <TransitionScale appear group tag="div" class="grid grid-cols-7 gap">
            <div v-for="(movie, index) in movies" :key="movie.id" ref="movieRefs" class="group relative cursor-pointer rounded">
                <div class="relative mb-3 aspect-2/3 overflow-hidden card">
                    <img v-if="movie.poster_path" :src="$getImageUrl(movie.poster_path, 'poster', 'w342')" :alt="movie.title" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
                    <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                        <span class="i-ph-film-strip-thin size-18 text-muted" />
                    </div>
                </div>
                <h3 class="mb-0.5">{{ movie.title }}</h3>
                <span v-if="movie.release_date" class="text-muted">{{ $dayjs(movie.release_date).get("year") }}</span>
                <Rating :tmdb-id="movie.id" type="movie" :rating="movie.vote_average" />
                <NuxtLink :to="'/movie/' + movie.id" class="absolute inset-0 z-10" />
            </div>
        </TransitionScale>
        <div ref="loadMoreTrigger" class="h-10"></div>
        <!-- Invisible trigger div for infinite scroll -->
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import type { TMDBSimilarMovie } from "~/types/movieDetails";

defineProps<{
    title?: string;
    movies: TMDBSimilarMovie[];
}>();

const emit = defineEmits(["loadMore"]); // Emit event to parent

const loadMoreTrigger = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            emit("loadMore"); // Emit event when trigger is visible
        }
    },
    { rootMargin: "100px" }, // Load more when close to bottom
);

onMounted(() => {
    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
});

onUnmounted(() => {
    if (loadMoreTrigger.value) {
        observer.unobserve(loadMoreTrigger.value);
    }
});
</script>
