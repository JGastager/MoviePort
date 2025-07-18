<template>
    <div>
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <TransitionSlide v-drag-scroll appear group tag="div" class="relative flex items-start overflow-x-auto pb-1 scrollbar-none gap" :class="overflow ? 'px-margin -mx-margin' : 'rounded'">
            <div v-if="before" class="relative w-40 flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 !aspect-2/3 focus:bg-primary/50 hover:bg-primary/50">
                <span class="size-6" :class="before.icon ? before.icon : 'i-ph-plus-square-bold'" />
                <h3>{{ before.text }}</h3>
                <NuxtLink :to="before.link" class="absolute inset-0 z-10" />
            </div>
            <PersonCard v-for="(person, index) in cast" :key="index" :person="person" />
            <div v-if="after" class="relative w-40 flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 !aspect-2/3 focus:bg-primary/50 hover:bg-primary/50">
                <span class="size-6" :class="after.icon ? after.icon : 'i-ph-plus-square-bold'" />
                <h3>{{ after.text }}</h3>
                <NuxtLink :to="after.link" class="absolute inset-0 z-10" />
            </div>
            <!-- <div class="absolute right-0 top-0 h-full w-19 flex cursor-pointer items-center justify-center card opacity-0 transition-opacity duration-300 hover:opacity-100">
                <span class="i-ph-arrow-right-bold size-6" />
            </div> -->
        </TransitionSlide>
    </div>
</template>

<script lang="ts" setup>
import type { TMDBCredit } from "~/types/person";

const _props = defineProps<{
    title?: string;
    cast: TMDBCredit[];
    before?: { link: string; text: string; icon?: string };
    after?: { link: string; text: string; icon?: string };
    overflow?: boolean;
}>();
</script>

<style></style>
