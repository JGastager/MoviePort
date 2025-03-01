<template>
    <div class="tvs-page">
        <MediaListing v-if="popularShows" title="Popular TV shows" :media="popularShows.results" type="tv" :more="true" @load-more="loadMoreShows" />
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

const currentPage = ref(1);

await fetchPopularShows(currentPage.value);

async function loadMoreShows() {
    currentPage.value++;
    await fetchPopularShows(currentPage.value);
}
</script>
