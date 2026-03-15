<template>
    <div class="providers">
        <h2 v-if="title" class="mb-3" :class="{ 'text-center': layout === 'center' }">{{ title }}</h2>
        <p v-if="!mappedProviders?.flatrate?.length && !buyOrRentProviders.length" class="mb-3 flex items-center gap-2.5 text-muted" :class="{ 'text-center justify-center': layout === 'center' }">
            <span class="i-ph-seal-warning-bold size-6 text-muted" />
            <span>No Providers found</span>
        </p>
        <div v-if="mappedProviders?.flatrate">
            <h3 class="mb-3" :class="{ 'text-center': layout === 'center' }">Stream</h3>
            <div class="flex flex-wrap gap-2.5" :class="{ 'mb-6': buyOrRentProviders.length, 'justify-center': layout === 'center' }">
                <template v-for="provider in mappedProviders?.flatrate">
                    <a v-if="provider.provider_link" :key="provider.provider_id" :href="provider.provider_link" target="_blank" class="button !pl-3">
                        <img :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" loading="lazy" alt="provider logo" class="size-7 rounded" />
                        <span>{{ provider.provider_name }}</span>
                    </a>
                    <div v-else :key="provider.provider_id + '-no-link'" class="h-11 inline-flex cursor-default items-center gap-2.5 card pl-3 pr-4">
                        <img :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" loading="lazy" alt="provider logo" class="size-7 rounded" />
                        <span>{{ provider.provider_name }}</span>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="buyOrRentProviders.length">
            <h3 class="mb-3" :class="{ 'text-center': layout === 'center' }">Buy or Rent</h3>
            <div class="flex flex-wrap gap-2.5" :class="{ 'justify-center': layout === 'center' }">
                <template v-for="provider in buyOrRentProviders">
                    <a v-if="provider.provider_link" :key="provider.provider_id" :href="provider.provider_link" target="_blank" class="button !pl-3">
                        <img :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" loading="lazy" alt="provider logo" class="size-7 rounded" />
                        <span>{{ provider.provider_name }}</span>
                    </a>
                    <div v-else :key="provider.provider_id + '-no-link'" class="h-11 inline-flex cursor-default items-center gap-2.5 card pl-3 pr-4">
                        <img :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" loading="lazy" alt="provider logo" class="size-7 rounded" />
                        <span>{{ provider.provider_name }}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineOptions({
    name: "ProvidersComponent",
});

interface Provider {
    provider_id: number;
    logo_path: string;
    provider_name: string;
}

interface ProvidersByCategory {
    buy?: Provider[];
    rent?: Provider[];
    flatrate?: Provider[];
}

const props = defineProps<{
    layout?: "center" | "left";
    title?: string;
    providers: Record<string, ProvidersByCategory>;
}>();

const providerLinks = [
    {
        provider_name: "Netflix",
        provider_id: [8, 1796, 175],
        provider_link: "https://www.netflix.com/",
    },
    {
        provider_name: "Amazon Prime Video",
        provider_id: [119, 9, 2100],
        provider_link: "https://www.primevideo.com/",
    },
    {
        provider_name: "Disney Plus",
        provider_id: [337],
        provider_link: "https://www.disneyplus.com/",
    },
    {
        provider_name: "Hulu",
        provider_id: [15],
        provider_link: "https://www.hulu.com/",
    },
    {
        provider_name: "HBO Max",
        provider_id: [384],
        provider_link: "https://www.hbomax.com/",
    },
    {
        provider_name: "Apple TV",
        provider_id: [2, 350],
        provider_link: "https://tv.apple.com/",
    },
    {
        provider_name: "Peacock",
        provider_id: [386, 387],
        provider_link: "https://www.peacocktv.com/",
    },
    {
        provider_name: "Paramount+",
        provider_id: [531, 187],
        provider_link: "https://www.paramountplus.com/",
    },
    {
        provider_name: "YouTube",
        provider_id: [188, 192, 235],
        provider_link: "https://www.youtube.com/",
    },
    {
        provider_name: "Google Play Movies",
        provider_id: [3],
        provider_link: "https://play.google.com/store/movies",
    },
    {
        provider_name: "Microsoft Store",
        provider_id: [68],
        provider_link: "https://www.microsoft.com/en-us/store/movies-and-tv",
    },
    {
        provider_name: "Sky",
        provider_id: [27, 29, 1773, 210, 321],
        provider_link: "https://www.sky.com/",
    },
];

const storedCountry = localStorage.getItem("userCountry");

const mappedProviders = computed(() => {
    if (storedCountry && props.providers) {
        const allProviders = props.providers[storedCountry] as ProvidersByCategory | undefined;
        if (!allProviders) return null;

        const categories: (keyof ProvidersByCategory)[] = ["buy", "rent", "flatrate"];

        return categories.reduce((acc: Record<string, Provider[]>, category) => {
            if (allProviders[category]) {
                acc[category] = allProviders[category]!.map((provider) => {
                    const linkEntry = providerLinks.find((entry) => entry.provider_id.includes(provider.provider_id));
                    return {
                        ...provider,
                        provider_link: linkEntry ? linkEntry.provider_link : null,
                    };
                });
            }
            return acc;
        }, {});
    }
    return null;
});

const buyOrRentProviders = computed(() => {
    const buy = mappedProviders.value?.buy || [];
    const rent = mappedProviders.value?.rent || [];
    const combined = [...buy, ...rent];
    const uniqueProviders = combined.filter((provider, index, self) => index === self.findIndex((p) => p.provider_id === provider.provider_id));
    return uniqueProviders;
});
</script>

<style></style>
