<template>
    <div class="search-page">
        <MediaListing v-if="searchMultiResults?.results?.length" title="Search Results" type="movie" :media="searchMultiResults.results" class="mb-10" />
        {{ searchMultiResults }}
    </div>
</template>

<script lang="ts" setup>
import { useSearchStore } from "~/store/search";

const searchStore = useSearchStore();

const { searchMultiResults } = storeToRefs(searchStore);
</script>
