<template>
    <div v-if="isLoggedIn" class="button" @click="toggleFavorite()">
        <span class="size-6 bg-gradient-to-br" :class="favoriteState ? 'i-ph-heart-fill from-rose-500 to-pink-500 animate-fly-in' : 'i-ph-heart-bold'" />
    </div>
    <PlusModalLink v-else to="/login" class="button">
        <span class="i-ph-heart-bold size-6 bg-gradient-to-br" />
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

// Use a local ref to manage the favorite state
const favoriteState = ref(props.status || false);

watch(
    () => props.status,
    (newVal) => {
        favoriteState.value = newVal;
    },
);

async function toggleFavorite() {
    const newState = !favoriteState.value;

    // Optimistically update the UI state
    favoriteState.value = newState;

    try {
        await accountStore.addFavorite(props.type, props.tmdbId, newState);
        console.log(`✅ Favorite status updated successfully for ${props.tmdbId}`);
    } catch (error) {
        favoriteState.value = !newState;
        console.error(`❌ Failed to update favorite status for ${props.tmdbId}:`, error);
    }
}
</script>

<style></style>
