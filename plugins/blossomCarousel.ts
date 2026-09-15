import { BlossomCarousel } from "@blossom-carousel/vue";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("BlossomCarousel", BlossomCarousel);
});
