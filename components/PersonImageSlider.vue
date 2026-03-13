<template>
    <h2 v-if="images?.length" class="mb-6">Portraits</h2>
    <div v-if="images?.length" v-drag-scroll class="slider relative w-full flex gap-7 overflow-x-auto rounded scrollbar-none">
        <template v-for="(image, index) in images" :key="index">
            <div v-if="image.iso_639_1 == 'en' || image.iso_639_1 == null">
                <div class="h-75 w-fit overflow-hidden card">
                    <img v-if="image.file_path" :src="$getImageUrl(image.file_path, 'backdrop', 'w1280')" loading="lazy" alt="image" :height="image.height" :width="image.width" class="h-full w-auto object-cover" />
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
const _props = defineProps<{
    images: [];
}>();
</script>

<style></style>
