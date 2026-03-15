<template>
    <div class="group relative aspect-2/3 overflow-hidden card" :class="{ 'cursor-pointer': posterPath }" @click="openModal">
        <template v-if="posterPath">
            <img :src="$getImageUrl(posterPath, 'poster', 'w500')" loading="lazy" alt="Poster" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
            <div class="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div class="i-ph-arrows-out size-9" />
            </div>
        </template>
        <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center">
            <span v-if="type === 'movie'" class="i-ph-film-strip-thin size-18 text-muted" />
            <span v-else-if="type === 'tv'" class="i-ph-television-simple-thin size-18 text-muted" />
            <span v-else-if="type === 'person'" class="i-ph-user-thin size-18 text-muted" />
        </div>
    </div>
    <Modal v-if="posterPath" v-model="modal" class="aspect-2/3 h-80vh">
        <img :src="$getImageUrl(posterPath, 'poster', 'w780')" loading="lazy" alt="Poster" class="h-full w-full object-cover" />
    </Modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
    name: "PosterComponent",
});

const _props = defineProps<{
    type: "movie" | "tv" | "person";
    posterPath?: string;
}>();

const modal = ref(false);

function openModal() {
    modal.value = true;
}
</script>
