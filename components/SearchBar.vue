<template>
    <div class="relative">
        <div
            ref="searchBar"
            class="search-bar pointer-events-auto w-103 cursor-text card transition-colors duration-300 <lg:w-11 focus:bg-primary/50 hover:bg-primary/50"
            :class="{ 'is-open': showResults && searchResults?.results && !isSearchPage }"
            @click.stop="showResults = true"
            @focusout="onFocusOut"
        >
            <div class="h-11 flex items-center">
                <input v-model="query" type="text" class="h-full w-full rounded b-none bg-transparent py-0 pl-4 text-1rem text-white font-sans outline-none <lg:w-0 <lg:px-1" @focus="handleFocus" @input="handleInput" @keydown.enter="loadSearchPage" />
                <button v-if="query" class="h-full w-10 flex flex-shrink-0 cursor-pointer items-center justify-center bg-transparent" @click="query = ''">
                    <span class="i-ph-x-bold size-6" />
                </button>
                <button class="h-full w-12 flex flex-shrink-0 cursor-pointer items-center justify-center bg-transparent pr-2" @click="loadSearchPage">
                    <span class="i-ph-magnifying-glass-bold size-6" />
                </button>
            </div>
            <TransitionExpand>
                <ul v-if="showResults && searchResults?.results && !isSearchPage" class="m-0 max-h-61 overflow-y-auto p-0 -mt-1.5">
                    <li v-for="(result, index) in searchResults?.results" :key="result.id || index" class="h-10 flex cursor-pointer items-center rounded transition-colors duration-300 hover:z-1 -my-1.5 first:mt-0 last:mb-0 hover:bg-primary/20">
                        <NuxtLink v-if="result.media_type === 'movie'" :to="`/movie/${result.id}`" class="w-full px-4" @click.self="handleResultClick">
                            <span class="line-clamp-1 line-height-7">
                                {{ result.title || result.name }}
                                <span class="text-sm text-muted">
                                    {{ getMediaType(result.media_type) }}
                                </span>
                                <span class="text-sm text-muted">
                                    {{ result.media_type === "movie" && result.release_date ? ", " + $dayjs(result.release_date).get("year") : null }}
                                </span>
                            </span>
                        </NuxtLink>
                        <NuxtLink v-else-if="result.media_type === 'tv'" :to="`/tv/${result.id}`" class="w-full px-4" @click.self="handleResultClick">
                            <span class="line-clamp-1 line-height-7">
                                {{ result.title || result.name }}
                                <span class="text-sm text-muted">
                                    {{ getMediaType(result.media_type) }}
                                </span>
                                <span class="text-sm text-muted">
                                    {{ result.media_type === "movie" && result.release_date ? ", " + $dayjs(result.release_date).get("year") : null }}
                                </span>
                            </span>
                        </NuxtLink>
                        <NuxtLink v-else :to="`/person/${result.id}`" class="w-full px-4" @click.self="handleResultClick">
                            <span class="line-clamp-1 line-height-7">
                                {{ result.title || result.name }}
                                <span class="text-sm text-muted">
                                    {{ getMediaType(result.media_type) }}
                                </span>
                                <span class="text-sm text-muted">
                                    {{ result.media_type === "movie" && result.release_date ? ", " + $dayjs(result.release_date).get("year") : null }}
                                </span>
                            </span>
                        </NuxtLink>
                    </li>
                    <li v-if="loading" class="h-10 flex items-center gap-2.5 px-4 text-muted">
                        <span class="i-ph-circle-notch-bold size-5 animate-spin" />
                        <span>Loading...</span>
                    </li>
                    <li v-else-if="searchStore.searchQuery.length && searchResults.results.length === 0" class="h-10 flex items-center gap-2.5 px-4 text-muted">
                        <span class="i-ph-seal-warning-bold size-5 text-muted" />
                        <span>No results found</span>
                    </li>
                </ul>
            </TransitionExpand>
        </div>
        <div v-if="showResults" class="fixed inset-0 z-0" @click="showResults = false" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { watchDebounced } from "@vueuse/core";
import { useSearchStore } from "~/store/search";

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();

const { searchResults, loading } = storeToRefs(searchStore);

const showResults = ref(false);

const searchBar = ref<HTMLElement | null>(null);

const isSearchPage = computed(() => route.path === "/search");

const query = ref("");

watchDebounced(
    query,
    (newQuery) => {
        searchStore.setSearchQuery(newQuery.trim());
    },
    { debounce: 300 },
);

watch(
    () => route.fullPath,
    () => {
        showResults.value = false;
    },
);

function handleInput() {
    if (!searchStore.searchQuery) {
        showResults.value = false;
    } else {
        showResults.value = true;
    }
}

function handleFocus() {
    if (searchStore.searchQuery) {
        showResults.value = true;
    }
}

function handleResultClick() {
    showResults.value = false;
}

function getMediaType(mediaType: string) {
    switch (mediaType) {
        case "movie":
            return "Movie";
        case "tv":
            return "TV Show";
        case "person":
            return "Person";
        default:
            return null;
    }
}

function onFocusOut() {
    requestAnimationFrame(() => {
        if (!searchBar.value!.contains(document.activeElement)) {
            showResults.value = false;
        }
    });
}
function loadSearchPage() {
    router.push("/search");
}

onMounted(() => {
    const urlQuery = route.query.query as string;
    if (urlQuery) {
        query.value = urlQuery;
    }
});
</script>
