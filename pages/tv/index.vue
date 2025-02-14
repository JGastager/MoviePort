<template>
  <div>
    <ShowListings title="Popular TV shows" :shows="popularShows" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useShowsStore } from '~/store/shows'

useHead({
    title: `TV Shows | MoviePort`,
})

const showsStore = useShowsStore()
const { fetchPopularShows } = showsStore
const { popularShows } = storeToRefs(showsStore)

onMounted(async () => {
    try {
        await fetchPopularShows()
    }
    catch (error) {
        console.error(error)
    }
})
</script>

<style></style>
