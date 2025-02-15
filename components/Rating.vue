<template>
    <div class="h-6 flex items-center gap-1.5">
        <div class="relative flex items-center gap-0.5 text-muted" :class="{ 'opacity-50 text-white': !ownRating }">
            <span class="i-ph-star-bold inline-block size-4" :class="{ 'text-amber-400': ownRating >= 1 }" />
            <span class="i-ph-star-bold inline-block size-4" :class="{ 'text-amber-400': ownRating >= 2 }" />
            <span class="i-ph-star-bold inline-block size-4" :class="{ 'text-amber-400': ownRating >= 3 }" />
            <span class="i-ph-star-bold inline-block size-4" :class="{ 'text-amber-400': ownRating >= 4 }" />
            <span class="i-ph-star-bold inline-block size-4" :class="{ 'text-amber-400': ownRating == 5 }" />
            <div class="pointer-events-none absolute h-full w-full flex items-center gap-0.5" :class="{ 'text-amber-400': ownRating }">
                <span v-if="(starRating >= 1 && !ownRating) || ownRating >= 1" class="i-ph-star-fill size-4" />
                <span v-if="(starRating >= 2 && !ownRating) || ownRating >= 2" class="i-ph-star-fill size-4" />
                <span v-if="(starRating >= 3 && !ownRating) || ownRating >= 3" class="i-ph-star-fill size-4" />
                <span v-if="(starRating >= 4 && !ownRating) || ownRating >= 4" class="i-ph-star-fill size-4" />
                <span v-if="(starRating == 5 && !ownRating) || ownRating == 5" class="i-ph-star-fill size-4" />
                <span v-if="starRating % 1 !== 0 && !ownRating" class="i-ph-star-half-fill size-4" />
            </div>
        </div>
        <span v-if="rating" class="text-muted">{{ (rating / 2).toFixed(1) }}</span>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

defineOptions({
    name: "RatingComponent",
});

const props = defineProps<{
    type: "movie" | "tv";
    tmdbId: number;
    rating: number;
}>();

const accountStore = useAccountStore();
const { ratedMovies, ratedTVShows } = storeToRefs(accountStore);

const starRating = computed(() => {
    return Math.round((props.rating / 2) * 2) / 2;
});

const ownRating = computed(() => {
    const ratedItems = props.type === "movie" ? ratedMovies.value?.results : ratedTVShows.value?.results;
    const item = ratedItems?.find((item) => Number(item.id) === Number(props.tmdbId));
    return item ? Math.round((Number(item.rating) / 2) * 2) / 2 : 0;
});
</script>
