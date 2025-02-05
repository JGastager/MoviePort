<template>
    <div class="rating button">
        <div class="relative flex items-center"  @mouseover="hovered = true" @mouseleave="[hovered = false, ownRating = 0]" @click="addRating">
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': hovered && ownRating >= 1}" @mouseover="setOwnRating(1)">
                <span class="i-ph-star-bold inline-block size-6 transition-colors" />
            </span>
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': hovered && ownRating >= 2}" @mouseover="setOwnRating(2)">
                <span class="i-ph-star-bold inline-block size-6 transition-colors" />
            </span>
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': hovered && ownRating >= 3}" @mouseover="setOwnRating(3)">
                <span class="i-ph-star-bold inline-block size-6 transition-colors" />
            </span>
            <span class="block h-6 w-7 pr-1" :class="{'text-amber-400': hovered && ownRating >= 4}" @mouseover="setOwnRating(4)">
                <span class="i-ph-star-bold inline-block size-6 transition-colors" />
            </span>
            <span class="block h-6 w-6" :class="{'text-amber-400': hovered && ownRating == 5}" @mouseover="setOwnRating(5)">
                <span class="i-ph-star-bold inline-block size-6 transition-colors" />
            </span>
            <div class="pointer-events-none absolute h-full w-full flex items-center gap-1" :class="{'text-amber-400': hovered}">
                <span v-if="(starRating >= 1 && !hovered) || ownRating >= 1" class="i-ph-star-fill size-6"   />
                <span v-if="(starRating >= 2 && !hovered) || ownRating >= 2" class="i-ph-star-fill size-6"/>
                <span v-if="(starRating >= 3 && !hovered) || ownRating >= 3" class="i-ph-star-fill size-6" />
                <span v-if="(starRating >= 4 && !hovered) || ownRating >= 4" class="i-ph-star-fill size-6" />
                <span v-if="(starRating == 5 && !hovered) || ownRating == 5" class="i-ph-star-fill size-6" />
                <span v-if="starRating % 1 !== 0 && !hovered" class="i-ph-star-half-fill size-6" />
            </div>
        </div>
        <span v-if="rating" class="text-muted">{{ (rating / 2).toFixed(1) }}</span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    type: 'movie' | 'tv';
    tmdbId: number;
    rating: number;
}>();

const { fetchTMDB } = useTMDB();

const hovered = ref(false);
const ownRating = ref(0);

const starRating = computed(() => {
    return Math.round((props.rating / 2) * 2) / 2;
});

function setOwnRating(rating: number) {
        ownRating.value = rating;
}

async function addRating() {
    const sessionId = localStorage.getItem("session_id");
    try {
        await fetchTMDB(`/${props.type}/${props.tmdbId}/rating`, {sessionI: sessionId}, "POST", {"value": (ownRating.value * 2)}, "session");
        console.log('Rating posted');
    } catch (error) {
        console.error('Error posting rating:', error);
    }
}
</script>

<style lang="scss">
body .rating.button {
    padding-left: 16px !important;
    padding-right: 16px !important;
}
</style>