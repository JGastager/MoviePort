<template>
    <div class="home-page">
        <div class="mb-15 gap grid-media-cards">
            <div class="group relative aspect-9/5 min-h-28 w-full cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="popularMovies.results[0]?.backdrop_path"
                        :src="$getImageUrl(popularMovies.results[0].backdrop_path, 'poster', 'w92')"
                        alt="Movies"
                        class="absolute inset-0 h-full w-full object-cover saturate-120 transition duration-300 group-hover:scale-102"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur-xl transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-film-strip-bold size-6" />
                    <h3>{{ $t("global.movies") }}</h3>
                </div>
                <NuxtLink to="/movie" class="absolute inset-0 h-full w-full" />
            </div>
            <div class="group relative aspect-9/5 min-h-28 w-full cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="popularShows?.results[0]?.backdrop_path"
                        :src="$getImageUrl(popularShows?.results[0].backdrop_path, 'poster', 'w92')"
                        alt="TV Shows"
                        class="absolute inset-0 h-full w-full object-cover saturate-120 transition duration-300 group-hover:scale-120"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur-xl transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-television-simple-bold size-6" />
                    <h3>{{ $t("global.tvShows") }}</h3>
                </div>
                <NuxtLink to="/tv" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="isLoggedIn" class="group relative aspect-9/5 min-h-28 w-full cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="watchlistMovies?.results[watchlistMovies.results.length - 1]?.backdrop_path"
                        :src="$getImageUrl(watchlistMovies.results[watchlistMovies.results.length - 1].backdrop_path, 'poster', 'w92')"
                        alt="Watchlist"
                        class="absolute inset-0 h-full w-full object-cover saturate-120 transition duration-300 group-hover:scale-120"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur-xl transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-bookmark-simple-bold size-6" />
                    <h3>{{ $t("global.watchlist") }}</h3>
                </div>
                <NuxtLink to="/watchlist" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="isLoggedIn" class="group relative aspect-9/5 min-h-28 w-full cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="ratedMovies?.results[ratedMovies.results.length - 1]?.backdrop_path"
                        :src="$getImageUrl(ratedMovies.results[ratedMovies.results.length - 1].backdrop_path, 'poster', 'w92')"
                        alt="Ratings"
                        class="absolute inset-0 h-full w-full object-cover saturate-120 filter transition duration-300 group-hover:scale-120"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur-xl transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-star-bold size-6" />
                    <h3>{{ $t("global.ratings") }}</h3>
                </div>
                <NuxtLink to="/ratings" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="isLoggedIn" class="group relative aspect-9/5 min-h-28 w-full cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="favoriteMovies?.results[favoriteMovies.results.length - 1]?.backdrop_path"
                        :src="$getImageUrl(favoriteMovies.results[favoriteMovies.results.length - 1].backdrop_path, 'poster', 'w92')"
                        alt="Favorites"
                        class="absolute inset-0 h-full w-full object-cover saturate-120 transition duration-300 group-hover:scale-120"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur-xl transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-heart-bold size-6" />
                    <h3>{{ $t("global.favorites") }}</h3>
                </div>
                <NuxtLink to="/favorites" class="absolute inset-0 h-full w-full" />
            </div>
            <div class="group relative aspect-9/5 min-h-28 w-full cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="popularPersons?.results[0]?.profile_path"
                        :src="$getImageUrl(popularPersons?.results[0].profile_path, 'profile', 'w45')"
                        alt="People"
                        class="absolute inset-0 h-full w-full object-cover saturate-120 transition duration-300 group-hover:scale-120"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur-xl transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-user-bold size-6" />
                    <h3>{{ $t("global.people") }}</h3>
                </div>
                <NuxtLink to="/person" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="!isLoggedIn" class="relative col-span-1 aspect-9/5 min-h-28 w-full flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                <span class="i-ph-plus-square-bold size-6" />
                <h3>{{ $t("global.more") }}</h3>
                <PlusModalLink to="/login" class="absolute inset-0 h-full w-full" />
            </div>
        </div>
        <MovieSlider v-if="trendingMovies?.results" :after="{ text: $t('global.allMovies'), link: '/movie', icon: 'i-ph-film-strip-bold' }" :title="$t('home.trendingMovies')" :overflow="true" :movies="trendingMovies.results" class="mb-10" />
        <ShowSlider v-if="trendingShows?.results" :after="{ text: $t('global.allTvShows'), link: '/tv', icon: 'i-ph-television-simple-bold' }" :title="$t('home.trendingTvShows')" :overflow="true" :shows="trendingShows.results" class="mb-10" />
        <PersonSlider v-if="popularPersons?.results" :after="{ text: $t('global.allPeople'), link: '/person', icon: 'i-ph-user-bold' }" :title="$t('home.trendingPeople')" :overflow="true" :cast="popularPersons.results" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";
import { useShowsStore } from "~/store/shows";
import { useAccountStore } from "~/store/account";
import { usePersonsStore } from "~/store/persons";

useHead({
    title: `MoviePort`,
});

const moviesStore = useMoviesStore();
const showsStore = useShowsStore();
const accountStore = useAccountStore();
const personsStore = usePersonsStore();

const { fetchTrendingMovies, fetchPopularMovies } = moviesStore;
const { fetchTrendingShows, fetchPopularShows } = showsStore;
const { fetchPopularPersons } = personsStore;
const { trendingMovies, popularMovies } = storeToRefs(moviesStore);
const { trendingShows, popularShows } = storeToRefs(showsStore);
const { ratedMovies, watchlistMovies, favoriteMovies } = storeToRefs(accountStore);
const { popularPersons } = storeToRefs(personsStore);
const { isLoggedIn } = accountStore;

await fetchTrendingMovies();
await fetchTrendingShows();
await fetchPopularMovies();
await fetchPopularShows();
await fetchPopularPersons();
</script>

<style lang="scss">
.fade-image-enter-active,
.fade-image-leave-active {
    transition:
        opacity 1.5s ease,
        filter 1.5s linear;
}

.fade-image-enter-from,
.fade-image-leave-to {
    opacity: 0;
    filter: blur(40px);
}
</style>
