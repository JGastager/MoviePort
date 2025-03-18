<template>
    <div v-if="personDetails" class="person-page">
        <div class="grid grid-cols-10 mb-30 gap-15">
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <Poster :poster-path="personDetails.images?.profiles[0]?.file_path" type="person" />
                </div>
            </section>
            <section class="col-span-6">
                <h1 class="mb-10">
                    {{ translatedContent.name }}
                </h1>
                <p class="mb-10">
                    {{ translatedContent.biography }}
                </p>
                <PersonImageSlider :images="personDetails.images?.profiles.slice(1)" />
            </section>
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10">
                        <div v-if="personDetails.birthday" class="flex items-center justify-between gap-3">
                            <h3>Birthdate</h3>
                            <span class="text-right text-muted">{{ dayjs(personDetails.birthday).format("L") }}</span>
                        </div>
                        <div v-if="personDetails.deathday" class="mb-10 flex items-center justify-between gap-3">
                            <h3>Deathday</h3>
                            <span class="text-right text-muted">{{ dayjs(personDetails.deathday).format("L") }}</span>
                        </div>
                        <div v-if="personDetails.place_of_birth" class="mb-10 flex items-center justify-between gap-3">
                            <h3>Place of Birth</h3>
                            <span class="text-right text-muted">{{ personDetails.place_of_birth }}</span>
                        </div>
                        <div v-if="personDetails.external_ids" class="mb-10 flex flex-wrap gap-2.5">
                            <NuxtLink v-if="personDetails.external_ids?.instagram_id" class="button" target="_blank" external rel="noopener noreferrer" :to="'https://instagram.com/' + personDetails.external_ids.instagram_id">
                                <span class="i-ph-instagram-logo-bold size-6" />
                            </NuxtLink>
                            <NuxtLink v-if="personDetails.external_ids?.facebook_id" class="button" target="_blank" external rel="noopener noreferrer" :to="'https://facebook.com/' + personDetails.external_ids.facebook_id">
                                <span class="i-ph-facebook-logo-bold size-6" />
                            </NuxtLink>
                            <NuxtLink v-if="personDetails.external_ids?.twitter_id" class="button" target="_blank" external rel="noopener noreferrer" :to="'https://twitter.com/' + personDetails.external_ids.twitter_id">
                                <span class="i-ph-x-logo-bold size-6" />
                            </NuxtLink>
                            <NuxtLink v-if="personDetails.external_ids?.youtube_id" class="button" target="_blank" external rel="noopener noreferrer" :to="'https://www.youtube.com/' + personDetails.external_ids.youtube_id">
                                <span class="i-ph-youtube-logo-bold size-6" />
                            </NuxtLink>
                            <NuxtLink v-if="personDetails.external_ids?.tiktok_id" class="button" target="_blank" external rel="noopener noreferrer" :to="'https://www.tiktok.com/' + personDetails.external_ids.tiktok_id">
                                <span class="i-ph-tiktok-logo-bold size-6" />
                            </NuxtLink>
                            <NuxtLink v-if="personDetails.external_ids.imdb_id" :to="`https://www.imdb.com/name/${personDetails.external_ids.imdb_id}/`" target="_blank" external rel="noopener noreferrer" class="button">
                                <span class="i-ph-film-slate-bold size-6" />
                                <span>IMDb</span>
                            </NuxtLink>
                            <NuxtLink v-if="personDetails.external_ids.wikipedia_id" target="_blank" external rel="noopener noreferrer" class="button" :to="'https://en.wikipedia.org/wiki/' + personDetails.external_ids.wikipedia_id">
                                <span class="i-custom-wikipedia size-6" />
                                <span>Wikipedia</span>
                            </NuxtLink>
                            <NuxtLink v-if="personDetails.homepage" target="_blank" external rel="noopener noreferrer" class="button" :to="personDetails.homepage">
                                <span class="i-ph-globe-bold size-6" />
                                <span>Website</span>
                            </NuxtLink>
                        </div>
                        <div v-if="personDetails.also_known_as?.length" class="mb-10 flex justify-between gap-3">
                            <h3>Also known as</h3>
                            <div class="flex flex-col justify-end text-right">
                                <span v-for="(alias, index) of personDetails.also_known_as" :key="index" class="text-muted">{{ alias }}</span>
                            </div>
                        </div>
                        <div class="mt-10">
                            <SelectBox v-model="selectedDetailsLanguage" :deselect="false" :options="personDetails.translations.translations" label-field="english_name" value-field="iso_639_1" class="relative w-max !z-100" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <PersonMediaListing v-if="personDetails?.combined_credits?.cast" class="mb-10" :title="'Movies and TV Shows with ' + personDetails.name" :media="personDetails?.combined_credits?.cast" />
        <PersonMediaListing v-if="personDetails?.combined_credits?.crew" :title="'Movies and TV Shows with ' + personDetails.name + ' as crew member'" :media="personDetails?.combined_credits?.crew" />
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { usePersonsStore } from "~/store/persons";
import { useAccountStore } from "~/store/account";
import PersonImageSlider from "~/components/PersonImageSlider.vue";

dayjs.extend(LocalizedFormat);

const route = useRoute();
const personId = Number(route.params.id);

const personStore = usePersonsStore();
const accountStore = useAccountStore();
const { preferredLanguage } = storeToRefs(accountStore);

const { fetchPersonDetails } = personStore;
const { personDetails } = storeToRefs(personStore);

await fetchPersonDetails(personId);

const selectedDetailsLanguage = ref<string | null>(null);
const translatedContent = computed(() => {
    if (selectedDetailsLanguage.value) {
        console.log(personDetails.value);
        const translation = personDetails.value?.translations.translations.find((translation) => translation.iso_639_1 === selectedDetailsLanguage.value);
        if (translation) {
            return {
                biography: translation.data.biography || null,
                name: translation.data.name || personDetails.value?.name,
            };
        }
    }
    return {
        biography: personDetails.value.biography,
        name: personDetails.value.name,
    };
});

selectedDetailsLanguage.value = hasPreferredLanguage(preferredLanguage.value);
function hasPreferredLanguage(language: string) {
    if (personDetails.value && personDetails.value.translations) {
        for (const translation of personDetails.value.translations.translations) {
            if (translation.iso_639_1 === language) {
                return translation.iso_639_1;
            }
        }
    }
    return "en";
}
</script>

<style></style>
