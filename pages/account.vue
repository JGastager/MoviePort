<template>
    <div class="account-page">
        <div v-if="accountDetails">
            <div class="mb-10 flex items-center gap-8">
                <img v-if="gravatarUrl" class="rounded-full" alt="Avatar" :src="gravatarUrl" />
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
                <Selectbox v-model="selectedLanguage" :deselect="false" :options="locales" label-field="name" value-field="code" :placeholder="$t('account.yourLanguagePreferencePlaceholder')" class="relative w-max !z-100" />
            </div>
            <div class="lists">
                <div v-if="favoriteMovies?.results?.length" class="favoriteMovies">
                    <MediaListing :title="$t('account.favoriteMovies')" :media="favoriteMovies.results" type="movie" />
                </div>
                <div v-if="favoriteTVShows?.results?.length" class="favoriteTVShows">
                    <MediaListing :title="$t('account.favoriteTvShows')" :media="favoriteTVShows.results" type="tv" />
                </div>
                <div v-if="ratedMovies?.results?.length" class="ratedMovies">
                    <MediaListing :title="$t('account.ratedMovies')" :media="ratedMovies.results" type="movie" />
                </div>
                <div v-if="ratedTVShows?.results?.length" class="ratedTVShows">
                    <MediaListing :title="$t('account.ratedTvShows')" :media="ratedTVShows.results" type="tv" />
                </div>
                <div v-if="watchlistMovies?.results?.length" class="watchlistMovies">
                    <MediaListing :title="$t('account.watchlistMovies')" :media="watchlistMovies.results" type="movie" />
                </div>
                <div v-if="watchlistTVShows?.results?.length" class="watchlistTVShows">
                    <MediaListing :title="$t('account.watchlistTvShows')" :media="watchlistTVShows.results" type="tv" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();
const { accountDetails, favoriteMovies, favoriteTVShows, ratedMovies, ratedTVShows, watchlistMovies, watchlistTVShows, preferredLanguage } = storeToRefs(accountStore);

const { fetchAccountDetails, fetchFavoriteMovies, fetchFavoriteTVShows, fetchRatedMovies, fetchRatedTVShows, fetchWatchlistMovies, fetchWatchlistTVShows, setPreferredLanguage } = accountStore;

const selectedLanguage = ref<string | null>(null);

const { locales, locale } = useI18n();

watch(selectedLanguage, (value) => {
    if (value) {
        locale.value = value;
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
