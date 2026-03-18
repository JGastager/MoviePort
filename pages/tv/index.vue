<template>
    <div class="tvs-page">
        <MediaListing v-if="popularShows" title="Popular TV shows" :media="popularShows.results" type="tv" @load-more="loadMoreShows" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useShowsStore } from "~/store/shows";

useHead({
    title: `TV Shows | MoviePort`,
});

const showsStore = useShowsStore();
const { fetchPopularShows } = showsStore;
const { popularShows } = storeToRefs(showsStore);

const currentPage = computed(() => popularShows.value.page || 1);

await fetchPopularShows(currentPage.value);

async function loadMoreShows() {
    await fetchPopularShows(currentPage.value + 1);
}
</script>
