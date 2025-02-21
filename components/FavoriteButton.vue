<template>
    <div class="button" @click="isLoggedIn ? writeFavorite() : $router.push('/login')">
        <span class="size-6 bg-gradient-to-br" :class="favoriteToggle ? 'i-ph-heart-fill from-rose-500 to-pink-500 animate-fly-in' : 'i-ph-heart-bold'" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const props = defineProps<{
    type: "movie" | "tv" | "person";
    tmdbId: number;
}>();

const accountStore = useAccountStore();
const { favoriteMovies, favoriteTVShows } = storeToRefs(accountStore);
const { addFavorite, isLoggedIn } = accountStore;

const inFavorite = computed(() => {
    const favoriteItems = props.type === "movie" ? favoriteMovies.value?.results : favoriteTVShows.value?.results;
    return favoriteItems?.some((item) => Number(item.id) === Number(props.tmdbId));
});

const favoriteToggle = ref(inFavorite.value);

function writeFavorite() {
    favoriteToggle.value = !favoriteToggle.value;
    try {
        addFavorite(props.type, props.tmdbId, favoriteToggle.value);
    } catch {
        favoriteToggle.value = !favoriteToggle.value;
    }
}
</script>

<style></style>
