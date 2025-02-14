<template>
  <div class="relative">
    <div
      class="search-bar pointer-events-auto z-10 w-103 cursor-text card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50"
      @click.stop="showResults = true"
    >
      <div class="h-11 flex items-center">
        <input
          v-model="searchString"
          type="text"
          class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem text-white font-sans outline-none"
          @focus="handleFocus"
          @input="handleInput"
          @blur="handleBlur"
        >
        <div
          class="h-full w-13 flex items-center justify-center pr-2"
        >
          <span class="i-ph-magnifying-glass-bold size-6" />
        </div>
      </div>
      <TransitionExpand>
        <ul
          v-if="showResults"
          class="m-0 p-0"
        >
          <li
            v-for="(result, index) in searchResults.results.slice(
              0,
              6,
            )"
            :key="result.id || index"
            class="h-10 flex cursor-pointer items-center rounded transition-colors duration-300 -my-1.5 last:mb-0 hover:bg-primary/20"
            @click="handleResultClick"
          >
            <NuxtLink
              v-if="result.media_type === 'movie'"
              :to="`/movie/${result.id}`"
              class="w-full px-4"
            >
              <span class="line-clamp-1">
                {{ result.title || result.name }}
                <span class="text-sm text-muted">
                  {{ getMediaType(result.media_type) }}
                </span>
                <span class="text-sm text-muted">
                  {{
                    result.media_type === "movie"
                      && result.release_date
                      ? ", "
                        + $dayjs(result.release_date).get(
                          "year",
                        )
                      : null
                  }}
                </span>
              </span>
            </NuxtLink>
            <NuxtLink
              v-else
              :to="`/tv/${result.id}`"
              class="w-full px-4"
            >
              <span class="line-clamp-1">
                {{ result.title || result.name }}
                <span class="text-sm text-muted">
                  {{ getMediaType(result.media_type) }}
                </span>
                <span class="text-sm text-muted">
                  {{
                    result.media_type === "movie"
                      && result.release_date
                      ? ", "
                        + $dayjs(result.release_date).get(
                          "year",
                        )
                      : null
                  }}
                </span>
              </span>
            </NuxtLink>
          </li>
          <li
            v-if="
              searchString.length >= 3
                && searchResults.results.length === 0
            "
            class="h-10 flex items-center px-4 text-muted"
          >
            No results found.
          </li>
          <li
            v-if="searchString.length && searchString.length < 3"
            class="h-10 flex items-center px-4 text-muted"
          >
            Please enter at least 3 characters to search.
          </li>
        </ul>
      </TransitionExpand>
    </div>
    <div
      v-if="showResults"
      class="fixed inset-0 z-0"
      @click="showResults = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const { fetchTMDB } = useTMDB()
const router = useRouter()
const route = useRoute()

const searchString = ref('')
const searchResults = ref({
    results: [],
})
const showResults = ref(false)

const fetchResults = async () => {
    if (searchString.value.length < 3) {
        searchResults.value.results = []
        return
    }

    searchResults.value = await fetchTMDB('/search/multi', {
        query: searchString.value,
    })
}

const debouncedFetchResults = debounce(fetchResults, 300)

watch(
    () => route.fullPath,
    () => {
        showResults.value = false
    },
)

function handleInput() {
    if (!searchString.value.trim()) {
        showResults.value = false
        searchResults.value.results = []
    }
    else {
        showResults.value = true
        debouncedFetchResults()
    }
}

function handleFocus() {
    if (searchString.value.trim()) {
        showResults.value = true
    }
}

function handleBlur() {
    showResults.value = false
}

function handleResultClick() {
    showResults.value = false
}

function getMediaType(mediaType: string) {
    switch (mediaType) {
    case 'movie':
        return 'Movie'
    case 'tv':
        return 'TV Show'
    case 'person':
        return 'Person'
    default:
        return null
    }
}
</script>
