<template>
    <div ref="movieListings" class="movie-listings">
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <TransitionScale appear group tag="div" class="grid grid-cols-7 items-start gap">
            <div v-for="elem in sortedMedia" :key="elem.id" ref="movieRefs" class="group relative cursor-pointer rounded">
                <div class="relative mb-3 aspect-2/3 overflow-hidden card">
                    <img v-if="elem.poster_path" :src="$getImageUrl(elem.poster_path, 'poster', 'w342')" :alt="elem.title" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
                    <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                        <span class="i-ph-film-strip-thin size-18 text-muted" />
                    </div>
                </div>
                <h3 class="mb-0.5">{{ elem.title || elem.name }}</h3>
                <small v-if="elem.character" class="block text-muted italic">{{ elem.character }}</small>
                <small v-if="elem.department || elem.job" class="block text-muted italic">{{ elem?.department }} | {{ elem.job }}</small>
                <span v-if="elem.release_date" class="text-muted">{{ $dayjs(elem.release_date).get("year") }}</span>
                <Rating :tmdb-id="elem.id" :type="elem.media_type" :rating="elem.vote_average" />
                <NuxtLink :to="'/' + elem.media_type + '/' + elem.id" class="absolute inset-0 z-10" />
            </div>
        </TransitionScale>
        <Transition name="to-top">
            <div v-if="media?.length > 28 && showToTop" class="pointer-events-none sticky bottom-0 z-10 w-full flex items-center justify-center px-22.5 py-12">
                <div class="pointer-events-auto backdrop-blur button" @click="scrollToTop">
                    <span class="i-ph-arrow-up size-6" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title?: string;
    media: [];
}>();

const media = props.media;

const sortedMedia = computed(() => {
    return [...media].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
});

const movieListings = ref<HTMLElement | null>(null);
const showToTop = ref(false);

const scrollToTop = () => {
    if (movieListings.value) {
        movieListings.value.scrollIntoView({ behavior: "smooth" });
    }
};
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
