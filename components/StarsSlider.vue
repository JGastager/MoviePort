<template>
    <h2 class="mb-6">Stars</h2>
    <div class="relative w-full flex gap-7 overflow-x-auto rounded">
        <div v-for="(star, index) in stars" :key="index" class="group cursor-pointer">
            <div class="mb-3 aspect-2/3 w-40 overflow-hidden card">
                <img src="~/assets/images/poster.jpg" alt="Star Name" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                <div class="durtation-300 absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div class="i-ph-arrow-square-in-bold size-6"/>
                </div>
            </div>
            <h3 class="mb-0.5">{{ star.character }}</h3>
            <span class="text-muted">{{ star.name}}</span>
        </div>
        <div class="absolute right-0 top-0 h-full w-19 flex cursor-pointer items-center justify-center card opacity-0 transition-opacity duration-300 hover:opacity-100">
            <span class="i-ph-arrow-right-bold size-6"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Star {
    name: string;
    character: string;
    image: string;
}

const props = defineProps<{
    stars: Star[];
}>();

</script>

<style>

</style>