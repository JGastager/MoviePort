<template>
    <div v-if="isLoggedIn" class="button" @click="writeToWatchlist()">
        <span class="size-6 bg-gradient-to-br" :class="watchlistToggle ? 'i-ph-bookmark-simple-fill from-indigo-400 to-blue-400 animate-fly-in' : 'i-ph-bookmark-simple-bold'" />
    </div>
    <PlusModalLink v-else to="/login" class="button">
        <span class="i-ph-bookmark-simple-bold size-6 bg-gradient-to-br" />
    </PlusModalLink>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const props = defineProps<{
    type: "movie" | "tv";
    tmdbId: number;
}>();

const accountStore = useAccountStore();
const { watchlistMovies, watchlistTVShows } = storeToRefs(accountStore);
const { addToWatchlist, isLoggedIn } = accountStore;

const inWatchlist = computed(() => {
    const watchlistItems = props.type === "movie" ? watchlistMovies.value?.results : watchlistTVShows.value?.results;
    return watchlistItems?.some((item) => Number(item.id) === Number(props.tmdbId));
});

const watchlistToggle = ref(inWatchlist.value);

function writeToWatchlist() {
    watchlistToggle.value = !watchlistToggle.value;
    try {
        addToWatchlist(props.type, props.tmdbId, watchlistToggle.value);
    } catch {
        watchlistToggle.value = !watchlistToggle.value;
    }
}
</script>

<style></style>
