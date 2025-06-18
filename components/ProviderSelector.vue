<template>
    <div class="provider-selector">
        <h2 class="mb-6">Favorite Streaming Provider</h2>
        <TransitionScale group tag="div" class="flex flex-wrap gap-4">
            <button v-for="provider in favoriteProviders" :key="provider.provider_id" :title="provider.provider_link" class="group gap-0 button !pl-3" @click="toggleProvider(provider.provider_id)">
                <img v-if="provider.logo_path" :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" alt="provider logo" class="mr-2.5 size-7 rounded" />
                <span v-else class="i-ph-check-square-offset-bold mr-2.5 size-6 flex items-center justify-center rounded" />
                <span>{{ provider.provider_name }}</span>
                <span class="i-ph-minus-square-bold size-0 opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:size-6 group-hover:opacity-100 group-hover:-mr-1" />
            </button>

            <button class="button" @click="openModal"><span class="i-ph-plus-square-bold size-6" /></button>
        </TransitionScale>
        <Modal v-model="modal" class="w-260 bg-secondary p-20">
            <TransitionExpand>
                <div v-if="!addCustom">
                    <h2 class="mb-6 text-center">Add Favorites</h2>
                    <TransitionScale group tag="div" class="flex flex-wrap justify-center gap-4">
                        <button v-for="provider in filteredProviders" :key="provider.provider_id" :title="provider.provider_link" class="group gap-0 button !pl-3" @click="toggleProvider(provider.provider_id)">
                            <div class="relative mr-2.5 size-7">
                                <img :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" alt="provider logo" class="size-7 rounded" :class="{ 'opacity-40': favoriteProviders.some((p) => p.provider_id === provider.provider_id) }" />
                                <TransitionScale>
                                    <span v-if="favoriteProviders.some((p) => p.provider_id === provider.provider_id)" class="i-ph-check-bold absolute left-1/2 top-1/2 block size-6 transform -translate-x-1/2 -translate-y-1/2" />
                                </TransitionScale>
                            </div>
                            <span>{{ provider.provider_name }}</span>
                            <span
                                v-if="favoriteProviders.some((p) => p.provider_id === provider.provider_id)"
                                class="i-ph-minus-square-bold size-0 opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:size-6 group-hover:opacity-100 group-hover:-mr-1"
                            />
                            <span v-else class="i-ph-plus-square-bold size-0 opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:size-6 group-hover:opacity-100 group-hover:-mr-1" />
                        </button>
                        <button v-for="provider in favoriteProviders.filter((p) => p.provider_link)" :key="provider.provider_id" :title="provider.provider_link" class="group gap-0 button !pl-3" @click="toggleProvider(provider.provider_id)">
                            <span class="i-ph-check-square-offset-bold mr-2.5 size-6 flex items-center justify-center rounded" />
                            <span>{{ provider.provider_name }}</span>
                            <span
                                v-if="favoriteProviders.some((p) => p.provider_id === provider.provider_id)"
                                class="i-ph-minus-square-bold size-0 opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:size-6 group-hover:opacity-100 group-hover:-mr-1"
                            />
                            <span v-else class="i-ph-plus-square-bold size-0 opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:size-6 group-hover:opacity-100 group-hover:-mr-1" />
                        </button>
                    </TransitionScale>
                    <div class="mt-10 flex justify-center">
                        <button class="button" @click="addCustom = true"><span class="i-ph-plus-square-bold size-6" /><span>Add custom</span></button>
                    </div>
                </div>
            </TransitionExpand>

            <TransitionExpand>
                <form v-if="addCustom" class="mx-auto max-w-140 flex flex-col items-center gap-2.5" @submit.prevent="addCustom = false">
                    <h2 class="mb-6 text-center">Add Custom</h2>
                    <div class="h-11 w-full flex flex-shrink-0 items-center border-2 border-transparent card border-solid transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                        <input v-model="name" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none" type="text" placeholder="Name" />
                        <div class="pointer-events-none h-full w-13 flex items-center justify-center pr-2">
                            <span class="i-ph-article-bold size-6" />
                        </div>
                    </div>
                    <div class="h-11 w-full flex flex-shrink-0 items-center border-2 border-transparent card border-solid transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                        <input v-model="domain" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none" type="text" placeholder="Domain or URL" required />
                        <div class="pointer-events-none h-full w-13 flex items-center justify-center pr-2">
                            <span class="i-ph-link-bold size-6" />
                        </div>
                    </div>
                    <button class="mt-3 button" @click="addCustomProvider">Done</button>
                </form>
            </TransitionExpand>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();
const { allProviders } = storeToRefs(accountStore);

const { fetchAllProviders } = accountStore;

const modal = ref(false);
const addCustom = ref(false);
const domain = ref("");
const name = ref("");

const favoriteProviders = ref([]);
const providers = ref([]);

function openModal() {
    modal.value = true;
}

// Load providers from local storage if available
const localProviders = localStorage.getItem("favoriteStreamingProviders");
if (localProviders) {
    favoriteProviders.value = JSON.parse(localProviders);
}

function addProvider(providerId) {
    const provider = allProviders.value.find((p) => p.provider_id === providerId);
    if (provider && !favoriteProviders.value.some((p) => p.provider_id === providerId)) {
        favoriteProviders.value.push(provider);
        localStorage.setItem("favoriteStreamingProviders", JSON.stringify(favoriteProviders.value));
    }
}
function removeProvider(providerId) {
    favoriteProviders.value = favoriteProviders.value.filter((p) => p.provider_id !== providerId);
    localStorage.setItem("favoriteStreamingProviders", JSON.stringify(favoriteProviders.value));
}
function addCustomProvider() {
    if (domain.value) {
        const customProvider = {
            provider_id: Date.now(), // Use a unique ID based on timestamp
            provider_name: name.value || domain.value,
            logo_path: "", // Placeholder for logo path
            provider_link: domain.value,
        };
        favoriteProviders.value.push(customProvider);
        localStorage.setItem("favoriteStreamingProviders", JSON.stringify(favoriteProviders.value));
        name.value = "";
        domain.value = "";
        addCustom.value = false;
    }
}

function toggleProvider(providerId) {
    if (favoriteProviders.value.some((p) => p.provider_id === providerId)) {
        removeProvider(providerId);
    } else {
        addProvider(providerId);
    }
}

const preselectedProviders = [8, 9, 15, 20, 29, 30, 35, 283, 337, 350, 384, 531, 538];

const filteredProviders = computed(() => allProviders.value.filter((provider) => preselectedProviders.includes(provider.provider_id)));

watch(modal, async (newVal, oldVal) => {
    if (newVal && !oldVal && providers.value.length === 0) {
        try {
            await fetchAllProviders();
        } catch (error) {
            console.error("Failed to fetch all streaming providers:", error);
        }
    }
});
</script>
