<template>
    <h2 v-if="images?.backdrops?.length" class="mb-6">Images</h2>
    <div v-if="images?.backdrops?.length" class="relative w-full flex gap-7 overflow-x-auto rounded">
        <template v-for="(image, index) in images?.backdrops" :key="index">
            <div v-if="image.iso_639_1 == 'en' || image.iso_639_1 == null">
                <div class="h-120 w-fit overflow-hidden card">
                    <img v-if="image.file_path" :src="$getImageUrl(image.file_path, 'backdrop', 'w1280')" loading="lazy" alt="image" :height="image.height" :width="image.width" class="h-full w-auto object-cover">
                </div>
            </div>
        </template>
        <div class="absolute right-0 top-0 h-full w-19 flex cursor-pointer items-center justify-center card opacity-0 transition-opacity duration-300 hover:opacity-100">
            <span class="i-ph-arrow-right-bold size-6"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    tmdbId: string;
    type: 'movie' | 'tv';
}>();

const images = ref({});

const { fetchTMDB } = useTMDB();

onMounted(async () => {
    try {
        images.value = await fetchTMDB(`/${props.type}/${props.tmdbId}/images`);
        console.log(`${props.type == 'tv' ? 'TV show' : 'Movie'} images:`, images.value);
    } catch (error) {
        console.error(`Error loading ${props.type == 'tv' ? 'TV show' : 'movie'} images:`, error);
    }
});
</script>

<style>

</style>