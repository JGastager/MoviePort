<template>
    <div id="player">
        <iframe :src="`https://vidsrc.me/embed/${props.type}?tmdb=${props.tmdbId}`" style="width: 100%; height: 100%;" frameborder="0" referrerpolicy="origin" allowfullscreen class="fixed left-0 top-0 h-full w-full" title="player"/>
        <!-- <div ref="shadowHost" class="rounded overflow-hidden"></div> -->
    </div>
</template>

<script lang="ts" setup>
// import { onMounted, ref } from 'vue';
const props = defineProps({
    type: {
        type: String, // movie or series
        required: true,
    },
    tmdbId: {
        type: Number,
        required: true,
    }
});

// const shadowHost = ref(null);

// onMounted(() => {
//   if (shadowHost.value) {
//     const shadowRoot = shadowHost.value.attachShadow({ mode: 'open' });
//     const iframe = document.createElement('iframe');
//     iframe.src = `https://vidsrc.me/embed/${props.type}?tmdb=${props.tmdbId}`;
//     iframe.style.border = 'none';
//     iframe.style.width = '100%';
//     iframe.style.height = '100vh';
//     shadowRoot.appendChild(iframe);
//   }
// });
</script>

<style>

</style>