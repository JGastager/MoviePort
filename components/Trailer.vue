<template>
  <div
    v-if="trailer"
    class="button"
    @click="openModal"
  >
    <span class="i-ph-monitor-play-bold size-6" />
    <span>Trailer</span>
  </div>
  <Teleport
    v-if="trailer"
    to="#modals"
  >
    <Transition name="modal">
      <div
        v-if="modal && trailer"
        class="fixed left-0 top-0 z-100 h-screen w-screen flex items-center justify-center bg-primary/30 backdrop-blur-md"
        @click.self="closeModal"
      >
        <div class="modal relative h-fit w-fit">
          <div class="aspect-16/9 w-60vw overflow-hidden card">
            <iframe
              width="560"
              height="315"
              title="trailer"
              :src="`https://www.youtube-nocookie.com/embed/${trailer.key}?&autoplay=1`"
              frameborder="0"
              allowfullscreen
              class="h-full w-full"
            />
          </div>
          <div
            class="absolute top-0 translate-x-full transform -right-3 button"
            @click="closeModal"
          >
            <span class="i-ph-x-bold size-6" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  type: 'movie' | 'tv'
  tmdbId: string
}>()

const modal = ref(false)
const videos = ref({})

const trailer = computed(() => {
    return videos.value?.results?.find((video: any) => video.type === 'Trailer')
})

function closeModal() {
    modal.value = false
}

function openModal() {
    modal.value = true
}

const { fetchTMDB } = useTMDB()

onMounted(async () => {
    if (props.type === 'movie') {
        try {
            videos.value = await fetchTMDB('/movie/' + props.tmdbId + '/videos')
            console.log('Movie videos:', videos.value)
        }
        catch (error) {
            console.error('Error loading movie videos:', error)
        }
    }
    else {
        try {
            videos.value = await fetchTMDB('/tv/' + props.tmdbId + '/videos')
            console.log('TV show videos:', videos.value)
        }
        catch (error) {
            console.error('Error loading TV show videos:', error)
        }
    }
})
</script>

<style>

</style>
