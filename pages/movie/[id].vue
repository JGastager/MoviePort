<template>
    <div>
        <div class="grid grid-cols-10 mb-30 gap-15">
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-3">
                        <div class="button" @click="triggerPlay()">
                            <span class="i-ph-play-bold size-6" />
                            <span>Watch now</span>
                        </div>
                        <WatchlistButton :tmdb-id="movieId" type="movie" />
                    </div>
                    <Poster v-if="movieDetails.poster_path" :poster-path="movieDetails.poster_path" />
                </div>
            </section>
            <section class="col-span-6">
                <h1 class="mb-10">
                    {{ movieDetails.title }}
                </h1>
                <p class="mb-10">
                    {{ movieDetails.overview }}
                </p>
                <Genres :genres="movieDetails.genres" class="mb-10" />
                <CastSlider v-if="movieCredits?.cast && movieCredits?.cast.length" :cast="movieCredits.cast" class="mb-10" />
                <ImageSlider v-if="movieId" :tmdb-id="movieId" type="movie" />
            </section>
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <RatingButton :rating="movieDetails.vote_average" :tmdb-id="movieId" type="movie" class="mb-10" />
                    <div class="mb-10">
                        <div class="flex items-center justify-between gap-3">
                            <h3>Duration</h3>
                            <span class="text-muted">{{ movieDetails.runtime }} minutes</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>Release</h3>
                            <span class="text-muted">{{ $dayjs(movieDetails.release_date).get("year") }}</span>
                        </div>
                    </div>
                    <div class="mb-10 flex flex-wrap gap-3">
                        <Trailer type="movie" :tmdb-id="movieId" />
                        <NuxtLink :to="`https://www.imdb.com/title/${movieDetails.imdb_id}/`" target="_blank" class="button">
                            <span class="i-ph-film-slate-bold size-6" />
                            <span>IMDb</span>
                        </NuxtLink>
                    </div>
                    <div v-if="directors?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>Director</h3>
                        <ul class="m-0 p-0">
                            <li v-for="director in directors" :key="director.id" class="list-none text-right text-muted line-height-27px">
                                {{ director.name }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="writers?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>Script</h3>
                        <ul class="m-0 p-0">
                            <li v-for="writer in writers" :key="writer.id" class="list-none text-right text-muted line-height-27px">
                                {{ writer.name }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="composers?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>Score</h3>
                        <ul class="m-0 p-0">
                            <li v-for="composer in composers" :key="composer.id" class="list-none text-right text-muted line-height-27px">
                                {{ composer.name }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="movieDetails?.production_companies?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>Production</h3>
                        <ul class="m-0 p-0">
                            <li v-for="producer in movieDetails.production_companies" :key="producer.id" class="list-none text-right text-muted line-height-27px">
                                <span>{{ producer.name }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        <!-- <pre>{{ details }}</pre> -->
        <MovieListings v-if="similarMovies?.results" title="Related movies" :movies="similarMovies.results" />
        <Teleport v-if="movieDetails.backdrop_path" to="#backdrop">
            <img v-if="movieDetails?.backdrop_path" :src="$getImageUrl(movieDetails.backdrop_path, 'backdrop', 'w1280')" alt="Backdrop" class="h-full w-full object-cover" />
            <img v-if="movieDetails?.backdrop_path" :src="$getImageUrl(movieDetails.backdrop_path, 'backdrop', 'original')" alt="Backdrop" class="absolute inset-0 h-full w-full object-cover" />
            <TransitionFade>
                <Player v-if="play && movieDetails?.id" :tmdb-id="movieDetails.id" type="movie" />
            </TransitionFade>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";
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

const movieStore = useMoviesStore();
const { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } = movieStore;
const { movieDetails, movieCredits, similarMovies } = storeToRefs(movieStore);

onMounted(async () => {
    await fetchMovieDetails(movieId);
    useHead({
        title: `${movieDetails.value?.title} | MoviePort`,
    });
    await fetchMovieCredits(movieId);
    await fetchSimilarMovies(movieId);
});

function triggerPlay() {
    play.value = true;
    if (play.value) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}
</script>

<style></style>
