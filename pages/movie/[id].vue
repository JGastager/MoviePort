<template>
    <div class="movie-page">
        <div class="grid grid-cols-10 mb-30 gap-15">
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-3">
                        <div class="button" @click="triggerPlay()">
                            <span class="i-ph-play-bold size-6" />
                            <span>{{ $t("movieDetails.watchNow") }}</span>
                        </div>
                        <WatchlistButton :tmdb-id="movieId" type="movie" />
                    </div>
                    <Poster v-if="movieDetails.poster_path" :poster-path="movieDetails.poster_path" />
                </div>
            </section>
            <section class="col-span-6">
                <h1 class="mb-10">
                    {{ translatedContent.title }}
                </h1>
                <h3 class="mb-3">
                    {{ translatedContent.tagline }}
                </h3>
                <p class="mb-10">
                    {{ translatedContent.overview }}
                </p>
                <Genres :genres="movieDetails.genres" class="mb-10" />
                <!-- <h3>Where to Rent</h3>
                <div class="flex flex-wrap gap-2.5">
                    <div v-for="provider in providers?.rent" :key="provider.provider_id" class="button">
                        <img :src="$getImageUrl(provider.logo_path, 'poster', 'w92')" alt="provider logo" class="size-7 rounded" />
                        <span>{{ provider.provider_name }}</span>
                    </div>
                </div> -->
                <PersonSlider v-if="movieCredits?.cast && movieCredits?.cast.length" :cast="movieCredits.cast" title="Cast" class="mb-10" />
                <ImageSlider v-if="movieId" :tmdb-id="movieId" type="movie" class="mb-10" />
                <Providers v-if="movieProviders?.results" :providers="movieProviders.results" />
            </section>
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-2.5">
                        <RatingButton :rating="movieDetails.vote_average" :tmdb-id="movieId" type="movie" />
                        <FavoriteButton :tmdb-id="movieId" type="movie" />
                    </div>
                    <div class="mb-10">
                        <div class="flex items-center justify-between gap-3">
                            <h3>{{ $t("movieDetails.duration") }}</h3>
                            <span class="text-right text-muted">{{ movieDetails.runtime }} {{ $t("global.minutes") }}</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>{{ $t("movieDetails.release") }}</h3>
                            <span class="text-right text-muted">{{ $dayjs(movieDetails.release_date).get("year") }}</span>
                        </div>
                    </div>
                    <div class="mb-10 flex flex-wrap gap-3">
                        <Trailer type="movie" :tmdb-id="movieId" />
                        <NuxtLink :to="`https://www.imdb.com/title/${movieDetails.imdb_id}/`" target="_blank" class="button">
                            <span class="i-ph-film-slate-bold size-6" />
                            <span>IMDb</span>
                        </NuxtLink>
                        <ShareButton type="movie" />
                    </div>
                    <div v-if="directors?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>{{ $t("movieDetails.director") }}</h3>
                        <ul class="m-0 p-0">
                            <li v-for="director in directors" :key="director.id" class="list-none text-right text-muted line-height-27px">
                                {{ director.name }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="writers?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>{{ $t("movieDetails.script") }}</h3>
                        <ul class="m-0 p-0">
                            <li v-for="writer in writers" :key="writer.id" class="list-none text-right text-muted line-height-27px">
                                {{ writer.name }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="composers?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>{{ $t("movieDetails.composers") }}</h3>
                        <ul class="m-0 p-0">
                            <li v-for="composer in composers" :key="composer.id" class="list-none text-right text-muted line-height-27px">
                                {{ composer.name }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="movieDetails?.production_companies?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>{{ $t("movieDetails.production") }}</h3>
                        <ul class="m-0 p-0">
                            <li v-for="producer in movieDetails.production_companies" :key="producer.id" class="list-none text-right text-muted line-height-27px">
                                <span>{{ producer.name }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-10">
                        <SelectBox v-model="selectedDetailsLanguage" :deselect="false" :options="movieDetails.translations.translations" label-field="english_name" value-field="iso_639_1" class="relative w-max !z-100" />
                    </div>
                </div>
            </section>
        </div>
        <!-- <pre>{{ details }}</pre> -->
        <MediaListing v-if="similarMovies?.results" :title="$t('movieDetails.relatedMovies')" :media="similarMovies.results" :more="true" type="movie" @load-more="loadMoreSimilarMovies" />
        <Teleport v-if="play" to="#backdrop">
            <TransitionFade>
                <Player v-if="play && movieDetails?.id" :tmdb-id="movieDetails.id" type="movie" />
            </TransitionFade>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";
import { useAccountStore } from "~/store/account";
import type { TMDBCredit } from "~/types/person";

const play = ref(false);

const directors = computed(() => {
    return movieCredits.value?.crew?.filter((crewmember: TMDBCredit) => crewmember.job === "Director");
});
const composers = computed(() => {
    return movieCredits.value?.crew?.filter((crewmember: TMDBCredit) => crewmember.job === "Original Music Composer");
});
const writers = computed(() => {
    return movieCredits.value?.crew?.filter((crewmember: TMDBCredit) => crewmember.job === "Writer");
});

const route = useRoute();

const movieId = Number(route.params.id);
const selectedDetailsLanguage = ref<string | null>(null);
const translatedContent = computed(() => {
    if (selectedDetailsLanguage.value) {
        const translation = movieDetails.value?.translations.translations.find((translation) => translation.iso_639_1 === selectedDetailsLanguage.value);
        if (translation) {
            return {
                overview: translation.data.overview || null,
                tagline: translation.data.tagline || null,
                title: translation.data.title || movieDetails.value?.title,
            };
        }
    }
    return {
        overview: movieDetails.value?.overview,
        tagline: movieDetails.value?.tagline,
        title: movieDetails.value?.title,
    };
});

const movieStore = useMoviesStore();
const accountStore = useAccountStore();
const { preferredLanguage } = storeToRefs(accountStore);
const { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, fetchMovieProviders } = movieStore;
const { movieDetails, movieCredits, similarMovies, movieProviders } = storeToRefs(movieStore);

const currentPage = ref(1);

await fetchMovieDetails(movieId);

selectedDetailsLanguage.value = hasPreferredLanguage(preferredLanguage.value);

function hasPreferredLanguage(language: string) {
    for (const translation of movieDetails.value?.translations?.translations || []) {
        if (translation.iso_639_1 === language) {
            return translation.iso_639_1;
        }
    }
    return "en";
}

useHead({
    title: `${movieDetails.value?.title} | MoviePort`,
});

await fetchMovieCredits(movieId);
await fetchSimilarMovies(movieId);
await fetchMovieProviders(movieId);

async function loadMoreSimilarMovies() {
    currentPage.value++;
    await fetchSimilarMovies(movieId, currentPage.value);
}

function triggerPlay() {
    play.value = true;
    if (play.value) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    localStorage.removeItem("lastWatchedMovie");
    localStorage.setItem("lastWatchedMovie", JSON.stringify(movieDetails.value));
}
</script>

<style></style>
