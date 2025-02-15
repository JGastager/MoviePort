<template>
    <div v-if="averageRating">
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <div class="relative mb-15 inline-block h-2 w-full rounded-full bg-primary/30">
            <div class="relative z-1 h-full rounded-full bg-amber-400" :style="{ width: `${averageRating * 10}%` }">
                <div class="i-ph-star-fill absolute right-0 top-1/2 size-6 translate-x-1/2 transform text-amber-400 -translate-y-1/2"></div>
                <div class="absolute right-0 top-5.5 h-11 flex translate-x-1/2 transform items-center justify-center card px-3 backdrop-blur">
                    <div class="">{{ (averageRating / 2).toFixed(1) }}</div>
                </div>
            </div>
            <div class="absolute left-0 top-5 transform rounded-full text-muted -translate-x-1/2">0</div>
            <div class="absolute left-1/5 top-5 transform rounded-full text-muted -translate-x-1/2">1</div>
            <div class="absolute left-2/5 top-5 transform rounded-full text-muted -translate-x-1/2">2</div>
            <div class="absolute left-3/5 top-5 transform rounded-full text-muted -translate-x-1/2">3</div>
            <div class="absolute left-4/5 top-5 transform rounded-full text-muted -translate-x-1/2">4</div>
            <div class="absolute left-full top-5 transform rounded-full text-muted -translate-x-1/2">5</div>
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

const averageRating = computed(() => {
    const ratedItems = props.type === "movie" ? ratedMovies.value.results : ratedTVShows.value.results;
    console.log(ratedItems);
    if (!ratedItems.length) return 0;
    const totalRating = ratedItems.reduce((sum, item) => sum + item.rating!, 0);
    return totalRating / ratedItems.length;
});
</script>
