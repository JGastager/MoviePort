<template>
    <div class="rating button">
        <div class="relative flex items-center"  @mouseover="hovered = true" @mouseleave="hovered = false" @click="addRating">
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': ownRating >= 1}" @mouseover="myNewRating = 1">
                <span class="i-ph-star-bold inline-block size-6" />
            </span>
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': ownRating >= 2}" @mouseover="myNewRating = 2">
                <span class="i-ph-star-bold inline-block size-6" />
            </span>
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': ownRating >= 3}" @mouseover="myNewRating = 3">
                <span class="i-ph-star-bold inline-block size-6" />
            </span>
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': ownRating >= 4}" @mouseover="myNewRating = 4">
                <span class="i-ph-star-bold inline-block size-6" />
            </span>
            <span class="block h-6 w-6" :class="{'text-amber-400': ownRating == 5}" @mouseover="myNewRating = 5">
                <span class="i-ph-star-bold inline-block size-6" />
            </span>
            <div class="pointer-events-none absolute h-full w-full flex items-center gap-1" :class="{'text-amber-400': hovered || myCurrentRating}">
                <span v-if="(starRating >= 1 && !ownRating) || ownRating >= 1" class="i-ph-star-fill size-6"   />
                <span v-if="(starRating >= 2 && !ownRating) || ownRating >= 2" class="i-ph-star-fill size-6"/>
                <span v-if="(starRating >= 3 && !ownRating) || ownRating >= 3" class="i-ph-star-fill size-6" />
                <span v-if="(starRating >= 4 && !ownRating) || ownRating >= 4" class="i-ph-star-fill size-6" />
                <span v-if="(starRating == 5 && !ownRating) || ownRating == 5" class="i-ph-star-fill size-6" />
                <span v-if="starRating % 1 !== 0 && !hovered" class="i-ph-star-half-fill size-6" />
            </div>
        </div>
        <span v-if="rating" class="text-muted">{{ (rating / 2).toFixed(1) }}</span>
    </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '~/store/account';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    type: 'movie' | 'tv';
    tmdbId: number;
    rating: number;
}>();

const accountStore = useAccountStore();
const { ratedMovies, ratedTVShows } = storeToRefs(accountStore);

const { fetchTMDB } = useTMDB();

const hovered = ref(false);
const myNewRating = ref(0);

const ownRating = computed(() => {
    return hovered.value ? myNewRating.value : myCurrentRating.value;
});

const starRating = computed(() => {
    return props.rating ? Math.round((props.rating / 2) * 2) / 2 : 0;
});

async function addRating() {
    const sessionId = localStorage.getItem("session_id");
    try {
        await fetchTMDB(`/${props.type}/${props.tmdbId}/rating`, {sessionI: sessionId}, "POST", {"value": (myNewRating.value * 2)}, "session");
        console.log('Rating posted');
    } catch (error) {
        console.error('Error posting rating:', error);
    }
}

const myCurrentRating = computed(() => {
    const ratedItems = props.type === 'movie' ? ratedMovies.value?.results : ratedTVShows.value?.results;
    const item = ratedItems?.find(item => item.id === props.tmdbId);
    return item ? Math.round((Number(props.rating!) / 2) * 2) / 2 : 0;
});
</script>

<style lang="scss">
body .rating.button {
    padding-left: 16px !important;
    padding-right: 16px !important;
}
</style>