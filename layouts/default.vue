<template>
    <div class="min-h-screen flex flex-col">
        <header
            class="pointer-events-none relative z-1 h-90 min-h-35 transition-all duration-800"
        >
            <div
                class="sticky top-0 flex items-start justify-between px-22.5 py-12"
            >
                <Navigation />
                <div class="flex gap-3">
                    <OptionsButton />
                    <!-- <AccountButton /> -->
                    <Login />
                    <SearchBar />
                </div>
            </div>
        </header>
        <main
            class="realtive flex-grow bg-primary/30 px-22.5 py-12 backdrop-blur"
        >
            <Brand />
            <slot />
            <div class="mt-30 flex items-center gap-4">
                <img
                    src="~assets/images/TMDB/alt-short.svg"
                    alt="TMDB Logo"
                    class="h-4"
                />
                <p class="text-muted">
                    This application uses TMDB and the TMDB APIs but is not
                    endorsed, certified, or otherwise approved by TMDB.
                </p>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import Brand from '~/components/Brand.vue';
import OptionsButton from '~/components/OptionsButton.vue';
</script>

<style lang="scss">
html:has(#backdrop #player) header {
    height: 100vh;
}
</style>
