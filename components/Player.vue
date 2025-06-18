<template>
    <div id="player">
        <iframe :src="playerUrl" style="width: 100%; height: 100%" frameborder="0" referrerpolicy="origin" allowfullscreen class="pointer-events-auto fixed left-0 top-0 h-full w-full" title="player" />
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: "PlayerComponent",
});
const props = defineProps<{
    type: "movie" | "tv";
    tmdbId: number;
    domain: string;
    season?: number;
    episode?: number;
}>();

const playerUrl = computed(() => {
    let url;
    if (props.type === "tv") {
        url = `https://${props.domain}/embed/${props.type}?tmdb=${props.tmdbId}`;
        if (props.season) {
            url += `&season=${props.season}`;
        }
        if (props.episode) {
            url += `&episode=${props.episode}`;
        }
    } else {
        url = `https://${props.domain}/embed/${props.type}?tmdb=${props.tmdbId}`;
    }
    console.log("Player type:", props.type, " url:", url);
    return url;
});
</script>

<style></style>
