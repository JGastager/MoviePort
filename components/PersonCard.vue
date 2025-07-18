<template>
    <div class="group relative w-40 flex-shrink-0 cursor-pointer">
        <div class="relative mb-3 aspect-2/3 w-full overflow-hidden card">
            <img v-if="person.profile_path" :src="$getImageUrl(person.profile_path, 'profile', 'w185')" loading="lazy" :alt="person.name" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm" />
            <div v-else class="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
                <span class="i-ph-user-thin size-18 text-muted" />
            </div>
            <div class="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div class="i-ph-arrow-square-in-bold size-6" />
            </div>
        </div>
        <h3 v-if="person.character" class="line-clamp-3 mb-0.5">
            {{ person.character.replace("(voice)", "") }}
            <span v-if="person.character.includes('(voice)')" class="tag py-1 text-sm !px-2.5">Voice</span>
        </h3>
        <h3 v-else class="mb-0.5">
            {{ person.name }}
        </h3>
        <span v-if="person.character" class="text-muted">{{ person.name }}</span>
        <NuxtLink :to="'/person/' + person.id" class="absolute inset-0" />
    </div>
</template>

<script lang="ts" setup>
const _props = defineProps<{
    person: {
        id: number;
        name: string;
        character?: string;
        profile_path?: string;
    };
}>();
</script>
