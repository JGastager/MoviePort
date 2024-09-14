<template>
    <nav class="flex gap-3">
        <div v-if="!isHome" class="button" @click="$router.back()">
            <span class="i-ph-arrow-left-bold size-6" />
        </div>
        <NuxtLink v-if="!isHome" to="/" class="button">
            <span class="i-ph-house-bold size-6" />
        </NuxtLink>
    </nav>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isHome = computed(() => route.path === '/');
</script>

<style>

</style>