<template>
    <div ref="MediaListing" class="media-listings">
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <TransitionScale appear group tag="div" class="items-start grid-media-cards">
            <MediaCard v-for="mediaItem in sortedMedia" :key="mediaItem.id" :media="mediaItem" :type="type" />
            <div
                v-if="media && more && !loadMore"
                class="relative flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 !aspect-2/3 w-media-card focus:bg-primary/50 hover:bg-primary/50"
                @click="loadMore = true"
            >
                <span class="i-ph-plus-square-bold size-6" />
                <h3>{{ $t("global.loadMore") }}</h3>
            </div>
        </TransitionScale>
        <div v-show="more" ref="scrollTrigger" class="pointer-events-none h-10 opacity-0"></div>
        <!-- Invisible trigger div for infinite scroll -->
        <Transition name="to-top">
            <div v-if="media?.length > 28 && showToTop" class="pointer-events-none sticky bottom-0 z-10 w-full flex items-center justify-center px-margin py-12">
                <div class="pointer-events-auto backdrop-blur button" @click="scrollToTop">
                    <span class="i-ph-arrow-up size-6" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import type { TMDBMovieBase } from "~/types/movieDetails";
import type { TMDBTvShowBase } from "~/types/tvshowDetails";

const props = defineProps<{
    type: "movie" | "tv";
    title?: string;
    media: TMDBMovieBase[] | TMDBTvShowBase[];
    more?: boolean;
}>();

const emit = defineEmits(["loadMore"]); // Emit event to parent
const viewport = useViewport();

const sortedMedia = computed(() => {
    if (props.more && !loadMore.value) {
        if (viewport.match("lg")) {
            return props.media?.slice(0, 4);
        } else if (viewport.match("xl")) {
            return props.media?.slice(0, 5);
        } else if (viewport.match("2xl")) {
            return props.media?.slice(0, 6);
        } else if (viewport.match("3xl")) {
            return props.media?.slice(0, 7);
        } else if (viewport.match("4xl")) {
            return props.media?.slice(0, 8);
        }
        return props.media?.slice(0, 11); // Default case for very small screens
    } else {
        return props.media;
    }
});

const MediaListing = ref<HTMLElement | null>(null);
const scrollTrigger = ref<HTMLElement | null>(null);
const loadMore = ref(false);
const showToTop = ref(false);

const observer = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            emit("loadMore"); // Emit event when trigger is visible
        }
    },
    { rootMargin: "70%" }, // Load more when close to bottom
);

const scrollToTop = () => {
    if (MediaListing.value) {
        MediaListing.value.scrollIntoView({ behavior: "smooth" });
    }
};

onMounted(() => {
    if (scrollTrigger.value) {
        observer.observe(scrollTrigger.value);
    }
    window.addEventListener("scroll", isScrolledPastThreshold);
});

onUnmounted(() => {
    if (scrollTrigger.value) {
        observer.unobserve(scrollTrigger.value);
    }
    window.removeEventListener("scroll", isScrolledPastThreshold);
});

function isScrolledPastThreshold() {
    if (MediaListing.value) {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const elementTop = MediaListing.value.getBoundingClientRect().top + scrollPosition;

        showToTop.value = scrollPosition - elementTop > viewportHeight;
    }
}
</script>

<style lang="scss">
.media-listings {
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
