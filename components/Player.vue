<template>
    <div id="player">
        <iframe :src="`https://${config.public.streamProviderDomain}/embed/${props.type}?tmdb=${props.tmdbId}`" style="width: 100%; height: 100%;" frameborder="0" referrerpolicy="origin" allowfullscreen class="fixed left-0 top-0 h-full w-full" title="player"/>
    </div>
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

const config = useRuntimeConfig();  // Access server-side config
</script>

<style>

</style>