<template>
    <button class="button" :class="[$attrs.class, $attrs.staticClass, filteredProviders.length ? null : 'disabled']" @click="watchNow()">
        <slot>
            <template v-if="filteredProviders.length">
                <span class="i-ph-play-bold size-6" />
                <span>{{ $t("movieDetails.watchNow") }}</span>
            </template>
            <template v-else>
                <span class="i-ph-seal-warning-bold size-6" />
                <span>No Providers</span>
            </template>
        </slot>
        <Modal v-if="filteredProviders.length > 1 || (favoriteProviders.length === 0 && filteredProviders.length)" v-model="modal" class="max-w-260 min-h-80 min-w-150 flex flex-col justify-center bg-secondary p-20">
            <h2 class="mb-6 text-center">Where to watch</h2>
            <div v-if="favoriteProviders.length > 0" class="flex flex-wrap justify-center gap-3">
                <button v-for="provider in filteredProviders" :key="provider.provider_id" :title="provider.provider_link" class="button !pl-3" @click="triggerPlay(provider)">
                    <img v-if="provider.logo_path" :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" alt="provider logo" class="size-7 rounded" />
                    <span v-else class="i-ph-check-square-offset-bold size-6 flex items-center justify-center rounded" />
                    <span>{{ provider.provider_name }}</span>
                </button>
            </div>
            <Providers v-else :providers="providers" layout="center" />
        </Modal>
    </button>
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
favoriteProviders.value = JSON.parse(localStorage.getItem("favoriteStreamingProviders") || "[]");

const storedCountry = localStorage.getItem("userCountry");

const availableProviders = computed(() => {
    const allCombinedProviders: Provider[] = [];
    if (storedCountry && _props.providers) {
        const countryProviders = _props.providers[storedCountry] as ProvidersByCategory | undefined;
        if (countryProviders) {
            Object.values(countryProviders).forEach((providersArr) => {
                if (Array.isArray(providersArr)) {
                    allCombinedProviders.push(...providersArr);
                }
            });
        }
    }
    return allCombinedProviders;
});

const filteredProviders = computed<Provider[]>(() => {
    if (favoriteProviders.value.length) {
        const result: Provider[] = [];
        // Include only favorite providers that are available
        result.push(...favoriteProviders.value.filter((fav: Provider) => fav.custom === true || availableProviders.value.some((p) => p.provider_id === fav.provider_id)));
        console.log("Filtered Providers:", result);
        return result;
    } else {
        // Include all available providers if no favorites or no available
        return availableProviders.value;
    }
});

function watchNow() {
    if (filteredProviders.value.length === 0) {
        console.warn("No available providers to watch.");
        return;
    } else if (filteredProviders.value.length > 1 || (favoriteProviders.value.length === 0 && filteredProviders.value.length)) {
        modal.value = true;
    } else {
        triggerPlay(filteredProviders.value[0]);
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
