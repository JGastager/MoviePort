<template>
    <div class="account-page">
        <div v-if="accountDetails">
            <div class="mb-10 flex items-center gap-8">
                <img v-if="gravatarUrl" loading="lazy" class="rounded-full" alt="Avatar" :src="gravatarUrl" />
                <div>
                    <h1 v-if="accountDetails.username" class="mb-3">{{ $t("account.hello") }}, {{ accountDetails.username }}</h1>
                    <span v-if="accountDetails.id">
                        Account-ID:
                        <span class="text-muted">{{ accountDetails.id }}</span>
                    </span>
                    <span v-if="accountDetails.iso_3166_1" class="text-muted"> | {{ accountDetails.iso_3166_1 }}</span>
                </div>
                <Logout />
            </div>
            <div class="mb-10">
                <h2 class="mb-5">{{ $t("account.yourLanguagePreference") }}</h2>
                <SelectBox v-model="selectedLanguage" :deselect="false" :options="locales" label-field="name" value-field="code" :placeholder="$t('account.yourLanguagePreferencePlaceholder')" class="relative w-max !z-100" />
            </div>
            <ProviderSelector class="mb-20" />
            <Tabs :tabs="tabTitles" :active-tab="currentTab" @update:active-tab="currentTab = $event">
                <template #content-0>
                    <div v-if="favoriteMovies?.results?.length" class="favoriteMovies">
                        <MediaListing :media="favoriteMovies.results" type="movie" />
                    </div>
                </template>
                <template #content-1>
                    <div v-if="favoriteTVShows?.results?.length" class="favoriteTVShows">
                        <MediaListing :media="favoriteTVShows.results" type="tv" />
                    </div>
                </template>
                <template #content-2>
                    <div v-if="ratedMovies?.results?.length" class="ratedMovies">
                        <MediaListing :media="ratedMovies.results" type="movie" />
                    </div>
                </template>
                <template #content-3>
                    <div v-if="ratedTVShows?.results?.length" class="ratedTVShows">
                        <MediaListing :media="ratedTVShows.results" type="tv" />
                    </div>
                </template>
                <template #content-4>
                    <div v-if="watchlistMovies?.results?.length" class="watchlistMovies">
                        <MediaListing :media="watchlistMovies.results" type="movie" />
                    </div>
                </template>
                <template #content-5>
                    <div v-if="watchlistTVShows?.results?.length" class="watchlistTVShows">
                        <MediaListing :media="watchlistTVShows.results" type="tv" />
                    </div>
                </template>
            </Tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useAccountStore } from "~/store/account";
import Tabs from "~/components/Tabs.vue";

const accountStore = useAccountStore();
const { accountDetails, favoriteMovies, favoriteTVShows, ratedMovies, ratedTVShows, watchlistMovies, watchlistTVShows, preferredLanguage } = storeToRefs(accountStore);

const { fetchAccountDetails, fetchFavoriteMovies, fetchFavoriteTVShows, fetchRatedMovies, fetchRatedTVShows, fetchWatchlistMovies, fetchWatchlistTVShows, setPreferredLanguage } = accountStore;

const selectedLanguage = ref<string | null>(null);
const currentTab = ref(0); // Tracks the active tab

const { t, locales, setLocale } = useI18n();

const tabTitles = computed(() => [t("account.favoriteMovies"), t("account.favoriteTvShows"), t("account.ratedMovies"), t("account.ratedTvShows"), t("account.watchlistMovies"), t("account.watchlistTvShows")]);

watch(selectedLanguage, async (value) => {
    if (value) {
        await setLocale(value);
        setPreferredLanguage(value);
    }
});

onMounted(async () => {
    selectedLanguage.value = preferredLanguage.value;
    try {
        await fetchAccountDetails();
        await fetchFavoriteMovies();
        await fetchFavoriteTVShows();
        await fetchRatedMovies();
        await fetchRatedTVShows();
        await fetchWatchlistMovies();
        await fetchWatchlistTVShows();
    } catch (error) {
        console.error("Failed to fetch account details:", error);
    }
});

const gravatarUrl = computed(() => (accountDetails.value?.avatar?.gravatar?.hash ? `https://www.gravatar.com/avatar/${accountDetails.value.avatar.gravatar.hash}` : null));
</script>
