<template>
    <nav class="flex gap-3">
        <Transition name="nav">
            <div v-if="!isHome" class="pointer-events-auto button" @click="$router.back()">
                <span class="i-ph-arrow-left-bold size-6" />
            </div>
        </Transition>
        <Transition name="nav">
            <NuxtLink v-if="!isHome" to="/" class="pointer-events-auto button">
                <span class="i-ph-house-bold size-6" />
            </NuxtLink>
        </Transition>
    </nav>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

import { ref, computed, watch } from "vue";

defineOptions({
    name: "NavigationComponent",
});
const route = useRoute();

const wasHome = ref(route.path === "/");

watch(
    () => route.path,
    (newPath, oldPath) => {
        if (oldPath === "/") {
            wasHome.value = true;
        }
    },
);

const isHome = computed(() => {
    return route.path === "/" || (route.path === "/login" && wasHome.value);
});
</script>

<style lang="scss">
.nav-enter-active,
.nav-leave-active {
    transition:
        opacity 0.6s ease,
        transform 0.6s ease;
}

.nav-enter-from,
.nav-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}
</style>
