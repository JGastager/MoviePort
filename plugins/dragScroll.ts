export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.directive("drag-scroll", (await import("@/directives/dragScroll")).default);
});
