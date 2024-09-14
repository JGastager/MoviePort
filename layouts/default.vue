<template>
    <div class="min-h-screen flex flex-col">
        <header class="h-90 min-h-35">
            <div class="sticky top-0 flex items-start justify-between px-22.5 py-12">
                <Navigation />
                <div class="flex gap-3">
                    <OptionsButton />
                    <AccountButton />
                    <SearchBar />
                </div>
            </div>
        </header>
        <main class="realtive flex-grow bg-primary/30 px-22.5 py-12 backdrop-blur">
            <Brand />
            <slot />
        </main>
    </div>
</template>

<script lang="ts" setup>
import Brand from '~/components/Brand.vue';
import OptionsButton from '~/components/OptionsButton.vue';


</script>

<style>

</style>