<template>
    <div class="min-h-screen flex flex-col justify-center">
        <div class="pointer-events-none fixed top-0 h-screen w-full">
            <div class="fixed top-0 h-screen w-full">
                <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight absolute h-190% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -right-30" />
                <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight-2 absolute h-185% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -left-30" />
                <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight-2 -bottom-0 absolute right-30 h-165% w-auto origin-bottom object-cover blur-xl" />
                <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight -bottom-0 absolute left-30 h-160% w-auto origin-bottom object-cover blur-xl" />
            </div>
        </div>
        <slot />
    </div>
</template>

<script lang="ts" setup></script>
