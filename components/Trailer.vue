<template>
    <div v-if="trailer" class="button" :class="[$attrs.class, $attrs.staticClass]" @click="openModal">
        <span class="i-ph-monitor-play-bold size-6" />
        <span>Trailer</span>
    </div>
    <Modal v-if="trailer" v-model="modal" class="aspect-16/9 w-60vw">
        <iframe width="560" height="315" title="trailer" :src="`https://www.youtube-nocookie.com/embed/${trailer.key}?&autoplay=1`" frameborder="0" allowfullscreen class="h-full w-full" />
    </Modal>
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
