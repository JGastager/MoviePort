<template>
    <div v-if="averageRating" class="flex flex-col">
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <div class="flex flex-grow flex-col items-center justify-center gap-2.5 card p-5">
            <div class="flex items-center justify-center gap-2.5">
                <h2>{{ averageRating.toFixed(1) }}</h2>
            </div>
            <div class="relative flex items-center gap-1">
                <span class="i-ph-star-bold inline-block size-6" :class="{ 'text-amber-400': averageRating >= 1 }" />
                <span class="i-ph-star-bold inline-block size-6" :class="{ 'text-amber-400': averageRating >= 2 }" />
                <span class="i-ph-star-bold inline-block size-6" :class="{ 'text-amber-400': averageRating >= 3 }" />
                <span class="i-ph-star-bold inline-block size-6" :class="{ 'text-amber-400': averageRating >= 4 }" />
                <span class="i-ph-star-bold inline-block size-6" :class="{ 'text-amber-400': averageRating == 5 }" />
                <div class="pointer-events-none absolute h-full w-full flex items-center gap-1 text-amber-400">
                    <span v-if="averageRating >= 1" class="i-ph-star-fill size-6" />
                    <span v-if="averageRating >= 2" class="i-ph-star-fill size-6" />
                    <span v-if="averageRating >= 3" class="i-ph-star-fill size-6" />
                    <span v-if="averageRating >= 4" class="i-ph-star-fill size-6" />
                    <span v-if="averageRating == 5" class="i-ph-star-fill size-6" />
                    <!-- <span v-if="starRating % 1 !== 0 && !ownRating" class="i-ph-star-half-fill size-6" /> -->
                </div>
            </div>
            <h3 class="text-muted">{{ ratedItems.length }} Ratings</h3>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useAccountStore } from "~/store/account";

const props = defineProps<{
    type: "movie" | "tv";
    title?: string;
}>();

const accountStore = useAccountStore();
const { ratedMovies, ratedTVShows } = storeToRefs(accountStore);

const ratedItems = computed(() => (props.type === "movie" ? ratedMovies.value.results : props.type === "tv" ? ratedTVShows.value.results : [...ratedMovies.value.results, ...ratedTVShows.value.results]));

const averageRating = computed(() => {
    if (!ratedItems.value.length) return 0;
    const totalRating = ratedItems.value.reduce((sum, item) => sum + item.rating!, 0);
    return totalRating / ratedItems.value.length / 2;
});
</script>
