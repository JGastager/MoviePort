<template>
    <div v-if="isLoggedIn" class="button" @click="toggleWatchlist()">
        <span class="size-6 bg-gradient-to-br" :class="watchlistState ? 'i-ph-bookmark-simple-fill from-indigo-400 to-blue-400 animate-fly-in' : 'i-ph-bookmark-simple-bold'" />
    </div>
    <PlusModalLink v-else to="/login" class="button">
        <span class="i-ph-bookmark-simple-bold size-6 bg-gradient-to-br" />
    </PlusModalLink>
</template>

<script lang="ts" setup>
import { useAccountStore } from "~/store/account";

const props = defineProps<{
    type: "movie" | "tv";
    tmdbId: number;
    status: boolean;
}>();

const accountStore = useAccountStore();
const { isLoggedIn } = accountStore;

// Use a local ref to manage the watchlist state
const watchlistState = ref(props.status || false);

watch(
    () => props.status,
    (newVal) => {
        watchlistState.value = newVal;
    },
);

async function toggleWatchlist() {
    const newState = !watchlistState.value;

    // Optimistically update the UI state
    watchlistState.value = newState;

    try {
        // Perform the API call in the background
        await accountStore.addToWatchlist(props.type, props.tmdbId, newState);
        console.log(`✅ Watchlist status updated successfully for ${props.tmdbId}`);
    } catch (error) {
        // Revert the UI state if the API call fails
        watchlistState.value = !newState;
        console.error(`❌ Failed to update watchlist status for ${props.tmdbId}:`, error);
    }
}
</script>

<style></style>
