<template>
    <div v-if="summarisedRatings">
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <div class="ml-6 flex flex-col-reverse gap-4">
            <div v-for="(star, key, index) in summarisedRatings" :key="index" class="relative inline-block h-3 w-full rounded-full bg-primary/30">
                <div class="h-full rounded-full from-orange-400 to-amber-400 bg-gradient-to-br" :style="{ width: `${(star / Object.values(summarisedRatings).reduce((a, b) => a + b, 0)) * 100}%` }"></div>
                <div class="absolute top-1/2 transform -left-5 -translate-y-1/2">{{ key }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useAccountStore } from "~/store/account";

const props = defineProps<{
    type?: "movie" | "tv";
    title?: string;
}>();

const accountStore = useAccountStore();
const { ratedMovies, ratedTVShows } = storeToRefs(accountStore);

const summarisedRatings = computed(() => {
    const ratedItems = props.type === "movie" ? ratedMovies.value.results : props.type === "tv" ? ratedTVShows.value.results : [...ratedMovies.value.results, ...ratedTVShows.value.results];
    const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    ratedItems.forEach((item) => {
        const rating = Math.ceil(item.rating! / 2) as keyof typeof ratings;
        if (ratings[rating] !== undefined) {
            ratings[rating]++;
        }
    });

    return ratings;
});
</script>
