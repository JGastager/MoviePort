<template>
    <div class="w-103 cursor-text card transition-colors duration-300 hover:bg-primary/40">
        <div class="h-11 flex items-center">
            <input type="text" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem text-white font-sans outline-none" >
            <div class="h-full w-13 flex cursor-pointer items-center justify-center pr-2">
                <span class="i-ph-magnifying-glass-bold size-6"/>
            </div>
        </div>
        <ul class="m-0 p-0">
            <li v-for="(result, index) in 3" :key="index" class="h-10 flex cursor-pointer items-center rounded px-4 transition-colors duration-300 -my-1.5 last:mb-0 hover:bg-primary/20">
                <span class="text-white">search result {{ index + 1 }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>