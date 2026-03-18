<template>
    <div class="pointer-events-auto flex overflow-hidden rounded gap-3">
        <!-- <div class="pointer-events-auto transition-all duration-300 button group-hover/options:scale-0 group-hover/options:opacity-0">
            <span class="i-ph-dots-three-bold size-6" />
        </div> -->
        <NuxtLink to="/movie" class="group pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 opacity-0 transition-all duration-300 ease-in-out button !gap-0 opacity-100">
            <span class="i-ph-film-strip-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-50 group-hover:pr-4 group-hover:opacity-100">{{ $t("global.movies") }}</span>
        </NuxtLink>
        <NuxtLink to="/tv" class="group pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 opacity-0 transition-all duration-300 ease-in-out button !gap-0 opacity-100">
            <span class="i-ph-television-simple-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-50 group-hover:pr-4 group-hover:opacity-100">{{ $t("global.tvShows") }}</span>
        </NuxtLink>
        <NuxtLink v-if="isAuthenticated" to="/watchlist" class="group pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 opacity-0 transition-all duration-300 ease-in-out button !gap-0 opacity-100">
            <span class="i-ph-bookmark-simple-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-50 group-hover:pr-4 group-hover:opacity-100">{{ $t("global.watchlist") }}</span>
        </NuxtLink>
        <NuxtLink v-if="isAuthenticated" to="/ratings" class="group pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 opacity-0 transition-all duration-300 ease-in-out button !gap-0 opacity-100">
            <span class="i-ph-star-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-50 group-hover:pr-4 group-hover:opacity-100">{{ $t("global.ratings") }}</span>
        </NuxtLink>
        <NuxtLink v-if="isAuthenticated" to="/favorites" class="group pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 opacity-0 transition-all duration-300 ease-in-out button !gap-0 opacity-100">
            <span class="i-ph-heart-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-50 group-hover:pr-4 group-hover:opacity-100">{{ $t("global.favorites") }}</span>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();

const { isLoggedIn } = storeToRefs(accountStore);

const isAuthenticated = computed(() => isLoggedIn.value);
</script>

<style></style>
