<template>
    <div v-if="genres && genres.length" class="flex flex-wrap gap-3">
        <div v-for="genre in genres" :key="genre.id" class="tag">
            {{ genre.name }}
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    genres: {
        type: Array,
        required: false,
        default: undefined
    }
});
</script>

<style lang="scss">
</style>