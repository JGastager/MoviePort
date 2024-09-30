<template>
  <iframe :src="`/player.html?type=${type}&tmdb=${tmdbId}`" style="width: 100%; height: 100%;" frameborder="0"  sandbox="allow-scripts" referrerpolicy="origin" allowfullscreen class="fixed top-0 left-0 w-full h-auto"></iframe>
</template>

<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String, // movie or series
        required: true,
    },
    tmdbId: {
        type: Number,
        required: true,
    }
});
</script>

<style>

</style>