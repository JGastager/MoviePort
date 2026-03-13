<template>
    <div class="home-page">
        <div class="mb-15 grid-media-cards gap">
            <SectionCard :image="popularMovies.results[0].backdrop_path" :title="$t('global.movies')" link="/movie" icon="i-ph-film-strip-bold" />
            <SectionCard :image="popularShows.results[0].backdrop_path" :title="$t('global.tvShows')" link="/tv" icon="i-ph-television-simple-bold" />
            <SectionCard v-if="isLoggedIn" :image="watchlistMovies.results[watchlistMovies.results.length - 1].backdrop_path" :title="$t('global.watchlist')" link="/watchlist" icon="i-ph-bookmark-simple-bold" />
            <SectionCard v-if="isLoggedIn" :image="ratedMovies.results[ratedMovies.results.length - 1].backdrop_path" :title="$t('global.ratings')" link="/ratings" icon="i-ph-star-bold" />
            <SectionCard v-if="isLoggedIn" :image="favoriteMovies.results[favoriteMovies.results.length - 1].backdrop_path" :title="$t('global.favorites')" link="/favorites" icon="i-ph-heart-bold" />
            <SectionCard :image="popularPersons.results[0].profile_path" :title="$t('global.people')" link="/person" icon="i-ph-user-bold" />
            <SectionCard v-if="!isLoggedIn" :title="$t('global.more')">
                <PlusModalLink to="/login" class="absolute inset-0 h-full w-full" />
            </SectionCard>
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
