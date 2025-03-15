<template>
    <div>
        <h2 v-if="title" class="mb-6">
            {{ title }}
        </h2>
        <TransitionSlide v-drag-scroll appear group tag="div" class="relative flex items-start gap overflow-x-auto pb-1 scrollbar-none" :class="overflow ? 'px-22.5 -mx-22.5' : 'rounded'">
            <div v-if="before" class="relative w-40 flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 !aspect-2/3 focus:bg-primary/50 hover:bg-primary/50">
                <span class="size-6" :class="before.icon ? before.icon : 'i-ph-plus-square-bold'" />
                <h3>{{ before.text }}</h3>
                <NuxtLink :to="before.link" class="absolute inset-0 z-10" />
            </div>
            <div v-for="(actor, index) in cast" :key="index" class="group relative w-40 flex-shrink-0 cursor-pointer">
                <div class="relative mb-3 aspect-2/3 w-full overflow-hidden card">
                    <img v-if="actor.profile_path" :src="$getImageUrl(actor.profile_path, 'profile', 'w185')" loading="lazy" :alt="actor.name" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
                    <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                        <span class="i-ph-user-thin size-18 text-muted" />
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div class="i-ph-arrow-square-in-bold size-6" />
                    </div>
                </div>
                <h3 v-if="actor.character" class="line-clamp-3 mb-0.5">
                    {{ actor.character.replace("(voice)", "") }}
                    <span v-if="actor.character.includes('(voice)')" class="tag py-1 text-sm !px-2.5">Voice</span>
                </h3>
                <h3 v-else class="mb-0.5">
                    {{ actor.name }}
                </h3>
                <span v-if="actor.character" class="text-muted">{{ actor.name }}</span>
                <NuxtLink :to="'/person/' + actor.id" class="absolute inset-0" />
            </div>
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
