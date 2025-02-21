<template>
    <div class="button" @click="share()">
        <span class="i-ph-share-bold size-6" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";
import { useShowsStore } from "~/store/shows";

const props = defineProps<{
    type: "movie" | "tv";
}>();

const moviesStore = useMoviesStore();
const showsStore = useShowsStore();
const { movieDetails } = storeToRefs(moviesStore);
const { tvShowDetails } = storeToRefs(showsStore);

async function share() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: `${props.type == "movie" ? movieDetails.value?.title : tvShowDetails.value?.name} | MoviePort`,
                text: `Check out this ${props.type == "movie" ? "movie" : "TV show"} i found on MoviePort!`,
                url: window.location.href,
            });
            console.log("Content shared successfully");
        } catch (err) {
            console.error("Error sharing:", err);
        }
    } else {
        // Fallback for unsupported browsers
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    }
}
</script>
