<template>
    <div>
        <MediaListing v-if="popularShows" title="Popular TV shows" :media="popularShows.results" type="tv" :more="true" @load-more="loadMoreShows" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useShowsStore } from "~/store/shows";

useHead({
    title: `TV Shows | MoviePort`,
});

const showsStore = useShowsStore();
const { fetchPopularShows } = showsStore;
const { popularShows } = storeToRefs(showsStore);

const currentPage = ref(1);

onMounted(async () => {
    try {
        await fetchPopularShows(currentPage.value);
    } catch (error) {
        console.error(error);
    }
});

async function loadMoreShows() {
    currentPage.value++;
    await fetchPopularShows(currentPage.value);
}
</script>
