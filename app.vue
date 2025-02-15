<template>
    <div class="min-h-screen bg-[#000711]">
        <div id="backdrop" class="fixed top-0 h-screen w-full">
            <!-- <img src="~/assets/images/backdrop.jpg" class="h-full w-full object-cover" alt="Backdrop" > -->
            <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight absolute h-190% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -right-30" />
            <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight-2 absolute h-185% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -left-30" />
            <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight-2 -bottom-0 absolute right-30 h-165% w-auto origin-bottom object-cover blur-xl" />
            <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight -bottom-0 absolute left-30 h-160% w-auto origin-bottom object-cover blur-xl" />
        </div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <div id="modals" />
    </div>
</template>

<style lang="scss">
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

body {
    margin: unset;
    color: white;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: normal;
}

p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: normal;
}

h1 {
    margin: 0;
    padding: 0;
    font-size: 40px;
    font-weight: normal;
    line-height: 40px;
}

h2 {
    margin: 0;
    padding: 0;
    font-size: 28px;
    font-weight: normal;
}

h3 {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: normal;
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
header .card,
#modals .button,
#modals .card {
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
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
}
</style>
