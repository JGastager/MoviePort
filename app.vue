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
    padding: unset;
    margin: unset;
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
    font-size: 14px;
    font-weight: normal;
    @screen lg {
        font-size: 16px;
    }
}

h1 {
    font-size: 32px;
    font-weight: normal;
    line-height: 1em;
    @screen lg {
        font-size: 40px;
    }
}

h2 {
    font-size: 24px;
    font-weight: normal;
    @screen lg {
        font-size: 28px;
    }
}

h3 {
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

.slider {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;

    scroll-behavior: smooth;
    position: relative;
    anchor-name: --slider;
    anchor-scope: --slider;

    > * {
        scroll-snap-align: center;
    }

    &::scroll-button(*) {
        width: 44px;
        height: 44px;
        border-radius: 8px;
        background-color: rgb(112 112 112 / 0.3);
        border: none;
        opacity: 0;
        display: flex;
        align-items: center;
        position: absolute;
        justify-content: center;
        z-index: 20;
        transition:
            background-color 0.3s,
            opacity 0.3s;
        backdrop-filter: blur(40px);
        cursor: pointer;
        outline: none;
        position-anchor: --slider;

        &:disabled {
            opacity: 0 !important;
            pointer-events: none;
        }
    }

    &:hover::scroll-button(*) {
        opacity: 1;

        &:is(:hover, :active) {
            background-color: rgb(112 112 112 / 0.5);
        }
    }

    &::scroll-button(left) {
        content: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iI2ZmZjVmNSIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMjgsMTI4YTEyLDEyLDAsMCwxLTEyLDEySDY5bDUxLjUyLDUxLjUxYTEyLDEyLDAsMCwxLTE3LDE3bC03Mi03MmExMiwxMiwwLDAsMSwwLTE3bDcyLTcyYTEyLDEyLDAsMCwxLDE3LDE3TDY5LDExNkgyMTZBMTIsMTIsMCwwLDEsMjI4LDEyOFoiPjwvcGF0aD48L3N2Zz4=) /
            "Scroll Left";
        position-area: left;
        transform: translateX(calc(100% + var(--grid-gutter)));
    }

    &::scroll-button(right) {
        content: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iI2ZmZjVmNSIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMjQuNDksMTM2LjQ5bC03Miw3MmExMiwxMiwwLDAsMS0xNy0xN0wxODcsMTQwSDQwYTEyLDEyLDAsMCwxLDAtMjRIMTg3TDEzNS41MSw2NC40OGExMiwxMiwwLDAsMSwxNy0xN2w3Miw3MkExMiwxMiwwLDAsMSwyMjQuNDksMTM2LjQ5WiI+PC9wYXRoPjwvc3ZnPg==) /
            "Scroll Right";
        position-area: right;
        transform: translateX(calc(-100% - var(--grid-gutter)));
    }

    &.overflow {
        scroll-padding: 0 var(--grid-margin);

        &::scroll-button(left) {
            transform: translateX(-50%);
            margin: calc(var(--grid-margin) - var(--grid-gutter) / 2);
        }
        &::scroll-button(right) {
            transform: translateX(50%);
            margin: calc(var(--grid-margin) - var(--grid-gutter) / 2);
        }
    }
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
