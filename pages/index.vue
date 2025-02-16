<template>
    <div class="home">
        <div class="grid grid-cols-10 mb-30 gap">
            <div class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="popularMovies.results[0]?.poster_path"
                        :src="$getImageUrl(popularMovies.results[0].poster_path, 'poster', 'w342')"
                        alt="Movies"
                        class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-film-strip size-9" />
                    <h3>Movies</h3>
                </div>
                <NuxtLink to="/movie" class="absolute inset-0 h-full w-full" />
            </div>
            <div class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="popularShows?.results[0]?.poster_path"
                        :src="$getImageUrl(popularShows?.results[0].poster_path, 'poster', 'w342')"
                        alt="TV Shows"
                        class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-television-simple size-9" />
                    <h3>TV Shows</h3>
                </div>
                <NuxtLink to="/tv" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="isLoggedIn" class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <img src="~assets/images/poster.jpg" alt="TV Shows" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102" />
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-bookmark-simple size-9" />
                    <h3>Watchlist</h3>
                </div>
                <NuxtLink to="/watchlist" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="isLoggedIn" class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img
                        v-if="ratedMovies?.results[0]?.poster_path"
                        :src="$getImageUrl(ratedMovies.results[0].poster_path, 'poster', 'w342')"
                        alt="Ratings"
                        class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102"
                    />
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-star size-9" />
                    <h3>Ratings</h3>
                </div>
                <NuxtLink to="/ratings" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="isLoggedIn" class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <img src="~assets/images/poster.jpg" alt="Favourites" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102" />
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-heart size-9" />
                    <h3>Favourites</h3>
                </div>
                <NuxtLink to="/likes" class="absolute inset-0 h-full w-full" />
            </div>
            <div v-if="!isLoggedIn" class="relative col-span-1 flex flex-shrink-0 flex-col cursor-pointer items-center justify-center gap-2.5 card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                <span class="i-ph-plus-square size-9" />
                <h3>more</h3>
            </div>
        </div>
        <MovieSlider v-if="trendingMovies?.results" :after="{ text: 'All movies', link: '/movie', icon: 'i-ph-film-strip-bold' }" title="Trending movies" :movies="trendingMovies.results" class="mb-10" />
        <ShowSlider v-if="trendingShows?.results" :after="{ text: 'All TV shows', link: '/tv', icon: 'i-ph-television-simple-bold' }" title="Trending TV shows" :shows="trendingShows.results" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "~/store/movies";
import { useShowsStore } from "~/store/shows";
import { useAccountStore } from "~/store/account";

useHead({
    title: `MoviePort`,
});

const moviesStore = useMoviesStore();
const showsStore = useShowsStore();
const accountStore = useAccountStore();
const { fetchTrendingMovies, fetchPopularMovies } = moviesStore;
const { fetchTrendingShows, fetchPopularShows } = showsStore;
const { trendingMovies, popularMovies } = storeToRefs(moviesStore);
const { trendingShows, popularShows } = storeToRefs(showsStore);
const { ratedMovies } = storeToRefs(accountStore);
const { isLoggedIn } = accountStore;

await fetchTrendingMovies();
await fetchTrendingShows();
await fetchPopularMovies();
await fetchPopularShows();
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
