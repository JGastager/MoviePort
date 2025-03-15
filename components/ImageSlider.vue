<template>
    <div class="image-slider">
        <h2 v-if="images?.backdrops?.length" class="mb-6">{{ $t("global.images") }}</h2>
        <div v-if="images?.backdrops?.length" v-drag-scroll class="relative w-full flex gap-7 overflow-x-auto rounded scrollbar-none">
            <template v-for="(image, index) in images?.backdrops" :key="index">
                <div v-if="image.iso_639_1 == 'en' || image.iso_639_1 == null">
                    <div class="h-120 w-fit overflow-hidden card">
                        <img v-if="image.file_path" :src="$getImageUrl(image.file_path, 'backdrop', 'w1280')" loading="lazy" alt="image" :height="image.height" :width="image.width" class="h-full w-auto object-cover" />
                    </div>
                </div>
            </template>
            <div class="absolute right-0 top-0 h-full w-19 flex cursor-pointer items-center justify-center card opacity-0 transition-opacity duration-300 hover:opacity-100">
                <span class="i-ph-arrow-right-bold size-6" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";
import { useShowsStore } from "~/store/shows";
import type { TMDBImagesResponse } from "~/types/general";

const props = defineProps<{
    tmdbId: number;
    type: "movie" | "tv";
}>();

const movieStore = useMoviesStore();
const { fetchMovieImages } = movieStore;
const { movieImages } = storeToRefs(movieStore);

const showStore = useShowsStore();
const { fetchTvShowImages } = showStore;
const { tvShowImages } = storeToRefs(showStore);

const images = ref({}) as Ref<TMDBImagesResponse>;

onMounted(async () => {
    if (!props.tmdbId) return;
    if (props.type == "movie") {
        await fetchMovieImages(props.tmdbId);
        images.value = movieImages.value;
    } else {
        await fetchTvShowImages(props.tmdbId);
        images.value = tvShowImages.value;
    }
});
</script>

<style></style>
