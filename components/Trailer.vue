<template>
    <div v-if="trailer" class="button" @click="openModal">
        <span class="i-ph-monitor-play-bold size-6" />
        <span>Trailer</span>
    </div>
    <Teleport v-if="trailer" to="#modals">
        <Transition name="modal">
            <div v-if="modal && trailer" class="fixed left-0 top-0 z-100 h-screen w-screen flex items-center justify-center bg-primary/20 backdrop-blur-md" @click.self="closeModal">
                <div class="modal relative h-fit w-fit">
                    <div class="aspect-16/9 w-60vw overflow-hidden card">
                        <iframe width="560" height="315" title="trailer" :src="`https://www.youtube-nocookie.com/embed/${trailer.key}?&autoplay=1`" frameborder="0" allowfullscreen class="h-full w-full" />
                    </div>
                    <div class="absolute top-0 translate-x-full transform -right-3 button" @click="closeModal">
                        <span class="i-ph-x-bold size-6" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useMoviesStore } from "~/store/movies";
import { useShowsStore } from "~/store/shows";
import type { TMDBVideosResponse } from "~/types/general";

defineOptions({
    name: "TrailerComponent",
});

const props = defineProps<{
    type: "movie" | "tv";
    tmdbId: number;
}>();

const modal = ref(false);

function closeModal() {
    modal.value = false;
}

function openModal() {
    modal.value = true;
}

const videos = ref({}) as Ref<TMDBVideosResponse>;

const trailer = computed(() => {
    return videos.value?.results?.find((video) => video.type === "Trailer");
});

const movieStore = useMoviesStore();
const { fetchMovieVideos } = movieStore;
const { movieVideos } = storeToRefs(movieStore);

const showStore = useShowsStore();
const { fetchTvShowVideos } = showStore;
const { tvShowVideos } = storeToRefs(showStore);

onMounted(async () => {
    if (!props.tmdbId) return;
    if (props.type == "movie") {
        await fetchMovieVideos(props.tmdbId);
        videos.value = movieVideos.value;
    } else {
        await fetchTvShowVideos(props.tmdbId);
        videos.value = tvShowVideos.value;
    }
});
</script>

<style></style>
