<template>
    <div>
        <ShowListings title="Trending TV shows" :shows="trendingShows" />
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import { useShowsStore } from '~/store/shows';
import {storeToRefs} from 'pinia';


useHead({
    title: `TV Shows | MoviePort`,
})

const showsStore = useShowsStore();
const {fetchTrendingShows} = showsStore;
const {trendingShows} = storeToRefs(showsStore);


onMounted(async () => {
    try {
        await fetchTrendingShows();
    } catch (error) {
        console.error(error);
    }
});
</script>

<style>

</style>