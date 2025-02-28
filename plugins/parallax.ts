export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("parallax", {
        mounted(el, binding) {
            const speed = binding.value || 0.1;
            const handleScroll = () => {
                const offset = window.scrollY;
                el.style.transform = `translateY(-${offset * speed}px)`;
            };
            window.addEventListener("scroll", handleScroll);
            el._onScroll = handleScroll;
        },
        unmounted(el) {
            window.removeEventListener("scroll", el._onScroll);
            delete el._onScroll;
        },
    });
});
