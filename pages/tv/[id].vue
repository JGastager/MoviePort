<template>
    <div class="tv-page">
        <div class="grid grid-cols-10 mb-30 gap-15">
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-3">
                        <WatchButton :tmdb-id="showId" type="tv" :providers="tvShowProviders.results" :season="activeSeason" :episode="1" @play="handlePlay(1)" />
                        <WatchlistButton :tmdb-id="showId" type="tv" :status="tvShowDetails?.account_states?.watchlist" />
                    </div>
                    <Poster :poster-path="tvShowDetails?.poster_path" type="tv" />
                </div>
            </section>
            <section class="col-span-6">
                <h1 class="mb-10">
                    {{ translatedContent.name }}
                </h1>
                <h3 class="mb-3">
                    {{ translatedContent.tagline }}
                </h3>
                <p class="mb-10">
                    {{ translatedContent.overview }}
                </p>
                <Genres :genres="tvShowDetails.genres" class="mb-20" />
                <h2 class="mb-6">{{ $t("tvShowDetails.seasons") }}</h2>
                <div class="seasons mb-6 flex flex-wrap gap-3">
                    <div
                        v-for="season in tvShowDetails.seasons"
                        :key="season.id"
                        class="season gap-0 overflow-hidden button !pl-1"
                        :class="[activeSeason === season.season_number ? 'active !bg-primary/50' : null, season.season_number == 0 ? 'order-last' : null]"
                        @click="activeSeason = season.season_number"
                    >
                        <div v-if="season.season_number == 0" class="ml-3">{{ $t("tvShowDetails.specials") }}</div>
                        <template v-else>
                            <span>{{ $t("tvShowDetails.season") }}</span>
                            <span class="ml-3">{{ season.season_number }}</span>
                        </template>
                    </div>
                </div>
                <TransitionScale group tag="div" class="episodes mb-10 flex flex-wrap gap-3">
                    <WatchButton
                        v-for="episode in tvShowSeasonDetails.episodes"
                        :key="episode.id"
                        :tmdb-id="showId"
                        type="tv"
                        :providers="tvShowProviders.results"
                        :season="activeSeason"
                        :episode="episode.episode_number"
                        class="episode"
                        :class="{ '!bg-primary/50': player.episode === episode.episode_number && player.season === activeSeason }"
                        @play="handlePlay(episode.episode_number)"
                    >
                        <TransitionScale>
                            <span v-if="player.episode === episode.episode_number && player.season === activeSeason" class="i-ph-play-fill size-6 from-green-400 to-emerald-400 bg-gradient-to-br" />
                        </TransitionScale>
                        <span>Ep. {{ episode.episode_number }}</span>
                        <span class="text-14px text-muted">{{ episode.name }}</span>
                    </WatchButton>
                </TransitionScale>
                <!-- <pre>{{tvShowSeasonDetails}}</pre> -->
                <PersonSlider v-if="tvShowCredits?.cast && tvShowCredits?.cast.length" :cast="tvShowCredits.cast" class="mb-10" />
                <ImageSlider v-if="showId" :tmdb-id="showId" type="tv" class="mb-10" />
                <Providers v-if="tvShowProviders?.results" title="Providers" :providers="tvShowProviders.results" />
            </section>
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-2.5">
                        <RatingButton :rating="tvShowDetails.vote_average" :tmdb-id="showId" type="tv" />
                        <FavoriteButton :tmdb-id="showId" type="tv" :status="tvShowDetails?.account_states?.favorite" />
                    </div>
                    <div class="mb-10">
                        <div class="flex items-center justify-between gap-3">
                            <h3>{{ $t("tvShowDetails.firstAirDate") }}</h3>
                            <span class="text-right text-muted">{{ dayjs(tvShowDetails.first_air_date).year() }}</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>{{ $t("tvShowDetails.status") }}</h3>
                            <span class="text-right text-muted">{{ tvShowDetails.status }}</span>
                        </div>
                    </div>
                    <div class="mb-10 flex flex-wrap gap-3">
                        <Trailer type="tv" :tmdb-id="showId" />
                        <!-- <NuxtLink :to="`https://www.imdb.com/title/${tvShowDetails.imdb_id}/`" target="_blank" class="button">
                            <span class="i-ph-film-slate-bold size-6" />
                            <span>IMDb</span>
                        </NuxtLink> -->
                        <ShareButton type="tv" />
                    </div>
                    <div v-if="tvShowDetails.created_by?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>{{ $t("tvShowDetails.creator") }}</h3>
                        <ul class="m-0 p-0">
                            <li v-for="creator in tvShowDetails.created_by" :key="creator.id" class="list-none text-right text-muted line-height-27px">
                                {{ creator.name }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="tvShowDetails?.production_companies?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>{{ $t("tvShowDetails.production") }}</h3>
                        <ul class="m-0 p-0">
                            <li v-for="producer in tvShowDetails.production_companies" :key="producer.id" class="list-none text-right text-muted line-height-27px">
                                <span>{{ producer.name }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-10">
                        <SelectBox v-model="selectedDetailsLanguage" :deselect="false" :options="tvShowDetails.translations.translations" label-field="english_name" value-field="iso_639_1" class="relative w-max !z-100" />
                    </div>
                </div>
            </section>
        </div>
        <MediaListing v-if="similarTvShows?.results" :title="$t('tvShowDetails.relatedTvShows')" :media="similarTvShows.results" :more="true" type="tv" @load-more="loadMoreSimilarTvShows" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useShowsStore } from "~/store/shows";
import { useAccountStore } from "~/store/account";
import { usePlayerStore } from "~/store/player";

const activeSeason = ref(1);
const activeEpisode = ref(0);

const route = useRoute();
const player = usePlayerStore();

const showId = Number(route.params.id);
const selectedDetailsLanguage = ref<string | null>(null);
const translatedContent = computed(() => {
    if (selectedDetailsLanguage.value) {
        const translation = tvShowDetails.value?.translations.translations.find((translation) => translation.iso_639_1 === selectedDetailsLanguage.value);
        if (translation) {
            return {
                overview: translation.data.overview || null,
                tagline: translation.data.tagline || null,
                name: translation.data.name || tvShowDetails.value?.name,
            };
        }
    }
    return {
        overview: tvShowDetails.value?.overview,
        tagline: tvShowDetails.value?.tagline,
        name: tvShowDetails.value?.name,
    };
});

watch(activeSeason, async (newSeason) => {
    await fetchTvShowSeasonDetails(showId, newSeason);
});

const showsStore = useShowsStore();
const accountStore = useAccountStore();
const { preferredLanguage } = storeToRefs(accountStore);

const { fetchTvShowDetails, fetchTvShowCredits, fetchTvShowSeasonDetails, fetchSimilarTvShows, fetchTvShowProviders } = showsStore;
const { tvShowDetails, tvShowCredits, similarTvShows, tvShowSeasonDetails, tvShowProviders } = storeToRefs(showsStore);

const currentPage = ref(1);

await fetchTvShowDetails(showId);

selectedDetailsLanguage.value = hasPreferredLanguage(preferredLanguage.value);

function hasPreferredLanguage(language: string) {
    for (const translation of tvShowDetails.value?.translations?.translations || []) {
        if (translation.iso_639_1 === language) {
            return translation.iso_639_1;
        }
    }
    return "en";
}

useHead({
    title: `${tvShowDetails.value?.name} | MoviePort`,
});

await fetchTvShowCredits(showId);
await fetchTvShowSeasonDetails(showId, activeSeason.value);
await fetchSimilarTvShows(showId);
await fetchTvShowProviders(showId);

async function loadMoreSimilarTvShows() {
    currentPage.value++;
    await fetchSimilarTvShows(showId, currentPage.value);
}

function handlePlay(episode_number) {
    activeEpisode.value = episode_number;
    localStorage.removeItem("lastWatchedTVShow");
    localStorage.setItem("lastWatchedTVShow", JSON.stringify(tvShowDetails.value));
}
</script>

<style lang="scss">
.seasons .season {
    span:first-of-type {
        direction: rtl;
        // width: 0;
        max-width: 0;
        opacity: 0;
        margin-left: 0;
        transition: all 0.3s ease;
    }

    &:hover,
    &.active {
        span:first-of-type {
            opacity: 1;
            max-width: 120px;
            margin-left: 16px;
            // width: calc-size(auto);
        }
    }
}
</style>
