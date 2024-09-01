<template>
    <div class="min-h-screen flex flex-col">
        <header class="min-h-35 flex justify-between px-22.5 py-12">
            <nav class="flex gap-3">
                <BackButton />
                <HomeButton />
            </nav>
            <div class="flex gap-3">
                <OptionsButton />
                <AccountButton />
                <SearchBar />
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