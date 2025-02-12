<template>
    <div>
        <div class="grid grid-cols-10 mb-30 gap-15">
            <div class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <img src="~assets/images/poster.jpg" alt="TV Shows" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102" >
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-bookmark-simple size-9" />
                    <h3>Watchlist</h3>
                </div>
                <NuxtLink to="/saves" class="absolute inset-0 h-full w-full"/>
            </div>
            <div class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img v-if="popularMovies?.length && popularMovies[0].poster_path" :src="$getImageUrl(popularMovies[0].poster_path, 'poster', 'w342')" alt="Movies" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102" >
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-film-strip size-9" />
                    <h3>Movies</h3>
                </div>
                <NuxtLink to="/movie" class="absolute inset-0 h-full w-full"/>
            </div>
            <div class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img v-if="popularShows?.length && popularShows[0].poster_path" :src="$getImageUrl(popularShows[0].poster_path, 'poster', 'w342')" alt="Movies" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102" >
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-television-simple size-9" />
                    <h3>TV Shows</h3>
                </div>
                <NuxtLink to="/tv" class="absolute inset-0 h-full w-full"/>
            </div>
            <div class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <Transition name="fade-image" appear>
                    <img v-if="ratedMovies?.length && ratedMovies[0].poster_path" :src="$getImageUrl(ratedMovies[0].poster_path, 'poster', 'w342')" alt="Movies" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102" >
                </Transition>
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-star size-9" />
                    <h3>Rated</h3>
                </div>
                <NuxtLink to="/rated" class="absolute inset-0 h-full w-full"/>
            </div>
            <div class="group relative col-span-2 aspect-2/1 cursor-pointer overflow-hidden rounded">
                <img src="~assets/images/poster.jpg" alt="Favourites" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-102" >
                <div class="relative h-full w-full flex flex-col items-center justify-center gap-2.5 bg-primary/30 backdrop-blur transition-colors duration-300 group-hover:bg-primary/50">
                    <span class="i-ph-heart size-9" />
                    <h3>Favourites</h3>
                </div>
                <NuxtLink to="/likes" class="absolute inset-0 h-full w-full"/>
            </div>
        </div>
        <MovieListings v-if="trendingMovies" title="Trending movies (will be slider in future)" :movies="trendingMovies" class="mb-10" />
        <ShowListings v-if="trendingShows" title="Trending TV shows (will be slider in future)" :shows="trendingShows" />
    </div>
</template>

<script lang="ts" setup>
import { useMoviesStore } from '~/store/movies';
import { useShowsStore } from '~/store/shows';
import { useAccountStore } from '~/store/account';
import { storeToRefs } from 'pinia';

useHead({
    title: `MoviePort`,
})

const moviesStore = useMoviesStore();
const showsStore = useShowsStore();
const accountStore = useAccountStore();
const { fetchTrendingMovies, fetchPopularMovies } = moviesStore;
const { fetchTrendingShows, fetchPopularShows } = showsStore;
const { fetchRatedMovies } = accountStore;
const { trendingMovies, popularMovies } = storeToRefs(moviesStore);
const { trendingShows, popularShows} = storeToRefs(showsStore);
const { ratedMovies } = storeToRefs(accountStore);

onMounted(async () => {
    try {
        await fetchTrendingMovies();
    }
    catch (error) {
        console.error(error);
    }
    try {
        await fetchTrendingShows();
    }
    catch (error) {
        console.error(error);
    }
    try {
        await fetchPopularMovies();
    }
    catch (error) {
        console.error(error);
    }
    try {
        await fetchPopularShows();
    }
    catch (error) {
        console.error(error);
    }
    try {
        await fetchRatedMovies();
    }
    catch (error) {
        console.error(error);
    }
})

</script>

<style lang="scss">
.fade-image-enter-active,
.fade-image-leave-active {
    transition: opacity 1.5s ease, filter 1.5s linear;
}

.fade-image-enter-from,
.fade-image-leave-to {
    opacity: 0;
    filter: blur(40px);
}
</style>