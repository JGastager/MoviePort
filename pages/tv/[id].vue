<template>
    <div class="tv-page">
        <div class="grid grid-cols-10 mb-30 gap-15">
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-3">
                        <div class="button" @click="triggerPlay()">
                            <span class="i-ph-play-bold size-6" />
                            <span>{{ $t("tvShowDetails.watchNow") }}</span>
                        </div>
                        <WatchlistButton :tmdb-id="showId" type="tv" />
                    </div>
                    <Poster v-if="tvShowDetails.poster_path" :poster-path="tvShowDetails.poster_path" />
                </div>
            </section>
            <section class="col-span-6">
                <h1 class="mb-10">
                    {{ tvShowDetails.name }}
                </h1>
                <h3 class="mb-10">
                    {{ tvShowDetails.tagline }}
                </h3>
                <p class="mb-10">
                    {{ tvShowDetails.overview }}
                </p>
                <Genres :genres="tvShowDetails.genres" class="mb-20" />
                <h2 class="mb-6">{{ $t("tvShowDetails.seasons") }}</h2>
                <div class="seasons mb-6 flex flex-wrap gap-3">
                    <div
                        v-for="season in tvShowDetails.seasons"
                        :key="season.id"
                        class="season gap-0 overflow-hidden button !pl-1"
                        :class="[activeSeason === season.season_number ? 'active' : null, season.season_number == 0 ? 'order-last' : null]"
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
                    <div v-for="episode in tvShowSeasonDetails.episodes" :key="episode.id" class="episode button" @click="((activeEpisode = episode.episode_number), triggerPlay())">
                        <span>Ep. {{ episode.episode_number }}</span>
                        <span class="text-14px text-muted">{{ episode.name }}</span>
                    </div>
                </TransitionScale>
                <!-- <pre>{{tvShowSeasonDetails}}</pre> -->
                <PersonSlider v-if="tvShowCredits?.cast && tvShowCredits?.cast.length" :cast="tvShowCredits.cast" class="mb-10" />
                <ImageSlider v-if="showId" :tmdb-id="showId" type="tv" />
            </section>
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-2.5">
                        <RatingButton :rating="tvShowDetails.vote_average" :tmdb-id="showId" type="tv" />
                        <FavoriteButton :tmdb-id="showId" type="tv" />
                    </div>
                    <div class="mb-10">
                        <div class="flex items-center justify-between gap-3">
                            <h3>{{ $t("tvShowDetails.firstAirDate") }}</h3>
                            <span class="text-muted">{{ dayjs(tvShowDetails.first_air_date).year() }}</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>{{ $t("tvShowDetails.status") }}</h3>
                            <span class="text-muted">{{ tvShowDetails.status }}</span>
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
                </div>
            </section>
        </div>
        <!-- <pre>{{ details }}</pre> -->
        <MediaListing v-if="similarTvShows?.results" :title="$t('tvShowDetails.relatedTvShows')" :media="similarTvShows.results" type="tv" />
        <Teleport v-if="play" to="#backdrop">
            <TransitionFade>
                <Player v-if="play && tvShowDetails?.id" :tmdb-id="tvShowDetails.id" :season="activeSeason" :episode="activeEpisode" type="tv" />
            </TransitionFade>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useShowsStore } from "~/store/shows";

const play = ref(false);

const activeSeason = ref(1);
const activeEpisode = ref(1);

const route = useRoute();

const showId = Number(route.params.id);

watch(activeSeason, async (newSeason) => {
    await fetchTvShowSeasonDetails(showId, newSeason);
});

const showsStore = useShowsStore();
const { fetchTvShowDetails, fetchTvShowCredits, fetchTvShowSeasonDetails, fetchSimilarTvShows } = showsStore;
const { tvShowDetails, tvShowCredits, similarTvShows, tvShowSeasonDetails } = storeToRefs(showsStore);

await fetchTvShowDetails(showId);
useHead({
    title: `${tvShowDetails.value?.name} | MoviePort`,
});
await fetchTvShowCredits(showId);
await fetchTvShowSeasonDetails(showId, activeSeason.value);
await fetchSimilarTvShows(showId);

function triggerPlay() {
    play.value = true;
    if (play.value) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
