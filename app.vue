<template>
    <div class="min-h-screen bg-secondary">
        <Topbar v-if="isElectron" />
        <NuxtLayout>
            <PlusModalNuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
const isElectron = ref(false);
onMounted(() => {
    // Check if the app is running in Electron
    if (window.electron) {
        isElectron.value = true;
    }
});
</script>

<style lang="scss">
:root {
    --grid-margin: 28px;
    --grid-gutter: 28px;

    @screen md {
        --grid-margin: 60px;
    }

    @screen xl {
        --grid-margin: 90px;
    }
}

@keyframes spotlight {
    0% {
        transform: rotate3d(1, 0, 0, 30deg);
    }
    25% {
        transform: rotate3d(0, 0, 1, -30deg);
    }
    50% {
        transform: rotate3d(1, 0, 1, 30deg);
    }
    75% {
        transform: rotate3d(0, 0, 1, -30deg);
    }
    100% {
        transform: rotate3d(1, 0, 0, 30deg);
    }
}

@keyframes spotlight2 {
    0% {
        transform: rotate3d(1, 0, 0, -30deg);
    }
    25% {
        transform: rotate3d(0, 0, 1, 30deg);
    }
    50% {
        transform: rotate3d(1, 0, 1, -30deg);
    }
    75% {
        transform: rotate3d(0, 0, 1, 30deg);
    }
    100% {
        transform: rotate3d(1, 0, 0, -30deg);
    }
}

.spotlight {
    animation: spotlight 120s infinite;
}

.spotlight-2 {
    animation: spotlight2 120s infinite reverse;
}

* {
    box-sizing: border-box;
}

html {
    overflow-x: hidden;
    scroll-behavior: smooth;
    background: #22272d;
}

body {
    margin: unset;
    color: white;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: normal;
    @screen lg {
        font-size: 16px;
    }
}

p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: normal;
    @screen lg {
        font-size: 16px;
    }
}

h1 {
    margin: 0;
    padding: 0;
    font-size: 32px;
    font-weight: normal;
    line-height: 1em;
    @screen lg {
        font-size: 40px;
    }
}

h2 {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: normal;
    @screen lg {
        font-size: 28px;
    }
}

h3 {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: normal;
    @screen lg {
        font-size: 18px;
    }
}

.button:has(span:only-child) {
    padding-left: 0 !important;
    padding-right: 0 !important;
}

a {
    text-decoration: none;
    color: white;
}

header .button,
header .card {
    backdrop-filter: blur(40px);
}

button {
    border: none;
    color: unset;
    font-family: unset;
    font-size: unset;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s;
    .modal {
        transition: transform 0.3s;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    .modal {
        transform: scale(0.5);
    }
}

.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s;
    .modal {
        transition: transform 0.3s;
    }
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    .modal {
        transform: scale(0.5);
    }
}
</style>
