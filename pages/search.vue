<template>
    <div class="search-page">
        <h2 class="mb-6">Search Results</h2>
        <div class="mb-10 w-full flex justify-between gap-3">
            <div class="flex gap-3">
                <button class="button" :class="{ 'bg-primary/50': searchStore.searchType === 'multi' }" @click="searchStore.setSearchType('multi')">All</button>
                <button class="button" :class="{ 'bg-primary/50': searchStore.searchType === 'movie' }" @click="searchStore.setSearchType('movie')">Movies</button>
                <button class="button" :class="{ 'bg-primary/50': searchStore.searchType === 'tv' }" @click="searchStore.setSearchType('tv')">TV Shows</button>
                <button class="button" :class="{ 'bg-primary/50': searchStore.searchType === 'person' }" @click="searchStore.setSearchType('person')">People</button>
            </div>
            <!-- <button class="button">
                <span class="i-ph-funnel-bold size-6" />
            </button> -->
        </div>
        <MediaListing v-if="searchResults?.results?.length" :type="searchStore.searchType !== 'multi' ? searchStore.searchType : undefined" :media="searchResults.results" class="mb-10" />
        <p v-if="loading" class="h-10 flex items-center gap-2.5 text-muted">
            <span class="i-ph-circle-notch-bold size-6 animate-spin" />
            <span>Loading...</span>
        </p>
        <p v-else-if="searchStore.searchQuery.length && searchResults.results?.length === 0" class="h-10 flex items-center gap-2.5 text-muted">
            <span class="i-ph-seal-warning-bold size-6 text-muted" />
            <span>No results found</span>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSearchStore } from "~/store/search";

const searchStore = useSearchStore();
const route = useRoute();
const router = useRouter();

const { searchResults, loading } = storeToRefs(searchStore);

onMounted(() => {
    const urlType = route.query.type as "movie" | "tv" | "person" | undefined;
    const urlQuery = route.query.query as string;

    if (urlType) {
        searchStore.searchType = urlType;
    }
    if (urlQuery) {
        searchStore.searchQuery = urlQuery.trim();
        searchStore.triggerSearch();
    }
});

watch([() => searchStore.searchQuery, () => searchStore.searchType], ([newSearchQuery, newSearchType]) => {
    const params = { ...route.query };
    if (newSearchQuery) {
        params.query = newSearchQuery;
    } else {
        delete params.query;
    }
    if (newSearchType !== "multi") {
        params.type = newSearchType;
    } else {
        delete params.type;
    }
    router.replace({ query: params });
});
</script>
