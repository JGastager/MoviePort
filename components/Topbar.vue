<template>
    <div id="topbar" class="pointer-events-auto fixed right-0 top-0 z-1000 h-8 w-full flex justify-end opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div class="h-full flex overflow-hidden rounded-bl bg-primary/30 backdrop-blur">
            <button class="group h-full w-10 flex cursor-pointer items-center justify-center bg-transparent transition-colors duration-300 hover:bg-primary/20" title="Minimize" @click="minimize">
                <span class="i-ph-minus-bold size-4 text-muted transition-colors duration-300 group-hover:text-white" />
            </button>
            <button class="group h-full w-10 flex cursor-pointer items-center justify-center bg-transparent transition-colors duration-300 hover:bg-primary/20" :title="isMaximized ? 'Restore' : 'Maximize'" @click="toggleMaximize">
                <span class="size-4 text-muted transition-colors duration-300 group-hover:text-white" :class="isMaximized ? 'i-ph-copy-simple-bold' : 'i-ph-square-bold'" />
            </button>
            <button class="group h-full w-10 flex cursor-pointer items-center justify-center bg-transparent transition-colors duration-300 hover:bg-red-600/60" title="Close" @click="close">
                <span class="i-ph-x-bold size-4 text-muted transition-colors duration-300 group-hover:text-white" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

defineOptions({
    name: "TopbarComponent",
});

const isMaximized = ref(false);

const minimize = () => window.electron.minimize();
const maximize = () => window.electron.maximize();
const restore = () => window.electron.restore();
const close = () => window.electron.close();

const toggleMaximize = () => {
    if (isMaximized.value) restore();
    else maximize();
};

const updateWindowState = (state) => {
    isMaximized.value = state === "maximized";
};

onMounted(() => {
    window.electron.onWindowStateChange(updateWindowState);
});

onUnmounted(() => {
    window.electron.onWindowStateChange(() => {}); // Cleanup listener
});
</script>

<style lang="scss">
#topbar {
    -webkit-app-region: drag; /* Makes topbar draggable */
    button {
        -webkit-app-region: no-drag; /* Prevents buttons from being draggable */
    }
}
</style>
