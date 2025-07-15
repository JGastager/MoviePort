<template>
    <div class="group relative aspect-9/5 min-h-25 w-full cursor-pointer overflow-hidden rounded" @click="$emit('click')">
        <Transition name="fade-image" appear>
            <img v-if="image" :src="$getImageUrl(image, 'backdrop', 'w300')" :alt="title" class="absolute inset-0 h-full w-full object-cover saturate-120 transition duration-300 group-hover:scale-120" />
        </Transition>
        <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur-xl transition-colors duration-300 group-hover:bg-primary/50">
            <span class="size-6" :class="icon ? icon : 'i-ph-plus-square-bold'" />
            <h3 v-if="title">{{ title }}</h3>
            <slot>
                <NuxtLink v-if="link" :to="link" class="absolute inset-0 h-full w-full" />
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const _props = defineProps<{
    title?: string;
    icon?: string;
    image?: string | null;
    link?: string;
}>();

const _emit = defineEmits<{
    (e: "click"): void;
}>();
</script>

<style></style>
