<template>
    <div ref="movieListings" class="movie-listings">
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <TransitionScale appear group tag="div" class="grid grid-cols-7 items-start gap">
            <div v-for="movie in movies" :key="movie.id" ref="movieRefs" class="group relative cursor-pointer rounded">
                <div class="relative mb-3 aspect-2/3 overflow-hidden card">
                    <img v-if="movie.poster_path" :src="$getImageUrl(movie.poster_path, 'poster', 'w342')" :alt="movie.title" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
                    <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                        <span class="i-ph-film-strip-thin size-18 text-muted" />
                    </div>
                    <div class="durtation-300 absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <div class="i-ph-arrow-square-in-bold size-6" />
                    </div>
                </div>
                <h3 class="mb-0.5">{{ movie.title }}</h3>
                <span v-if="movie.release_date" class="text-muted">{{ $dayjs(movie.release_date).get("year") }}</span>
                <Rating :tmdb-id="movie.id" type="movie" :rating="movie.vote_average" />
                <NuxtLink :to="'/movie/' + movie.id" class="absolute inset-0 z-10" />
            </div>
        </TransitionScale>
        <div ref="loadMoreTrigger" class="pointer-events-none h-10 opacity-0"></div>
        <!-- Invisible trigger div for infinite scroll -->
        <Transition name="to-top">
            <div v-if="movies?.length > 28 && showToTop" class="pointer-events-none sticky bottom-0 z-10 w-full flex items-center justify-center px-22.5 py-12">
                <div class="pointer-events-auto backdrop-blur button" @click="scrollToTop">
                    <span class="i-ph-arrow-up size-6" />
                </div>
            </div>
        </Transition>
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

const movieListings = ref<HTMLElement | null>(null);
const loadMoreTrigger = ref<HTMLElement | null>(null);
const showToTop = ref(false);

const observer = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            emit("loadMore"); // Emit event when trigger is visible
        }
    },
    { rootMargin: "50%" }, // Load more when close to bottom
);

const scrollToTop = () => {
    if (movieListings.value) {
        movieListings.value.scrollIntoView({ behavior: "smooth" });
    }
};

onMounted(() => {
    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
    window.addEventListener("scroll", isScrolledPastThreshold);
});

onUnmounted(() => {
    if (loadMoreTrigger.value) {
        observer.unobserve(loadMoreTrigger.value);
    }
    window.removeEventListener("scroll", isScrolledPastThreshold);
});

function isScrolledPastThreshold() {
    if (movieListings.value) {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const elementTop = movieListings.value.getBoundingClientRect().top + scrollPosition;

        showToTop.value = scrollPosition - elementTop > viewportHeight;
    }
}
</script>

<style lang="scss">
.movie-listings {
    scroll-margin: 40px;
    .to-top-enter-active,
    .to-top-leave-active {
        transition:
            opacity 0.6s ease,
            transform 0.6s ease;
    }

    .to-top-enter-from,
    .to-top-leave-to {
        opacity: 0;
        transform: translateY(100%);
    }
}
</style>
