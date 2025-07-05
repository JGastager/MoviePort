<template>
    <div class="button" :class="[$attrs.class, $attrs.staticClass]" @click="watchNow()">
        <slot>
            <span class="i-ph-play-bold size-6" />
            <span>{{ $t("movieDetails.watchNow") }}</span>
        </slot>
    </div>
    <Modal v-if="favoriteProviders.length > 1 || availableProviders.length === 0" v-model="modal" class="max-w-260 min-h-80 min-w-150 flex flex-col justify-center bg-secondary p-20">
        <h2 class="mb-6 text-center">Where to watch</h2>
        <div class="flex flex-wrap justify-center gap-4">
            <button v-for="provider in availableProviders" :key="provider.provider_id" :title="provider.provider_link" class="button !pl-3" @click="triggerPlay(provider)">
                <img v-if="provider.logo_path" :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" alt="provider logo" class="size-7 rounded" />
                <span v-else class="i-ph-check-square-offset-bold size-6 flex items-center justify-center rounded" />
                <span>{{ provider.provider_name }}</span>
            </button>
        </div>
        <p v-if="!availableProviders.length" class="mb-3 flex items-center justify-center gap-2.5 text-muted">
            <span class="i-ph-seal-warning-bold size-6 text-muted" />
            <span>No Providers found</span>
        </p>
    </Modal>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "~/store/player";

interface Provider {
    provider_id: number;
    logo_path: string;
    provider_name: string;
    provider_link?: string;
    custom?: boolean; // Optional field to mark custom providers
}

interface ProvidersByCategory {
    buy?: Provider[];
    rent?: Provider[];
    flatrate?: Provider[];
}

const _props = defineProps<{
    providers: Record<string, ProvidersByCategory>;
    type: "movie" | "tv";
    tmdbId: number;
    season?: number;
    episode?: number;
}>();

const emit = defineEmits(["play"]);

const player = usePlayerStore();

const modal = ref(false);
const favoriteProviders = ref([]);
const selectedProvider = ref<Provider | null>(null);

// Load providers from local storage if available
const localProviders = localStorage.getItem("favoriteStreamingProviders");
if (localProviders) {
    favoriteProviders.value = JSON.parse(localProviders);
}

const storedCountry = localStorage.getItem("userCountry");

const availableProviders = computed<Provider[]>(() => {
    if (storedCountry && _props.providers) {
        const countryProviders = _props.providers[storedCountry] as ProvidersByCategory | undefined;
        if (!countryProviders) return [];
        // Flatten all providers from the given categories into a single array
        const allProviders: Provider[] = [];
        Object.values(countryProviders).forEach((providersArr) => {
            if (Array.isArray(providersArr)) {
                allProviders.push(...providersArr);
            }
        });
        return favoriteProviders.value.filter((fav: any) => fav.custom === true || allProviders.some((provider: Provider) => provider.provider_id === fav.provider_id));
    }
    return [];
});

function watchNow() {
    if (favoriteProviders.value.length > 1) {
        modal.value = true;
    } else {
        triggerPlay(favoriteProviders.value[0]);
    }
}

function triggerPlay(provider: Provider) {
    if (provider && provider.provider_link && !/^https?:\/\//i.test(provider.provider_link) && !/^www\./i.test(provider.provider_link)) {
        modal.value = false;
        emit("play", provider);
        selectedProvider.value = provider;
        player.openPlayer({
            tmdbId: _props.tmdbId,
            type: _props.type,
            season: _props.season,
            episode: _props.episode,
            selectedProvider: provider,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (provider && provider.provider_link) {
        modal.value = false;
        emit("play", provider);
        window.open(/^https?:\/\//i.test(provider.provider_link) ? provider.provider_link : `https://${provider.provider_link}`, "_blank");
    } else {
        console.error("Invalid provider link:", provider);
    }
}
</script>

<style></style>
