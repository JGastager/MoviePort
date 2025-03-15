<template>
    <div class="min-h-screen flex flex-col">
        <div id="backdrop" class="pointer-events-none fixed top-0 h-screen w-full">
            <TransitionFade :duration="{ enter: 1200, leave: 600 }" :delay="{ enter: 600, leave: 0 }">
                <img
                    v-if="currentRouteType === 'movie' && movieDetails?.backdrop_path"
                    v-parallax
                    :src="$getImageUrl(movieDetails.backdrop_path, 'backdrop', 'original')"
                    alt="Backdrop"
                    class="custom-clip-gradient mx-auto block h-230 max-h-full w-auto object-cover"
                />
                <img
                    v-else-if="currentRouteType === 'tv' && tvShowDetails?.backdrop_path"
                    v-parallax
                    :src="$getImageUrl(tvShowDetails.backdrop_path, 'backdrop', 'original')"
                    alt="Backdrop"
                    class="custom-clip-gradient mx-auto block h-230 max-h-full w-auto object-cover"
                />
                <img
                    v-else-if="currentRouteType === 'home' && (lastWatchedMovie || popularMovie)"
                    v-parallax
                    :src="$getImageUrl(lastWatchedMovie ? lastWatchedMovie?.backdrop_path : popularMovie?.backdrop_path, 'backdrop', 'original')"
                    alt="Backdrop"
                    class="custom-clip-gradient-home ml-auto mr-0 block h-230 max-h-full w-auto object-cover"
                />
                <div v-else class="fixed top-0 h-screen w-full">
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight absolute h-190% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -right-30" />
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight-2 absolute h-185% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -left-30" />
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight-2 -bottom-0 absolute right-30 h-165% w-auto origin-bottom object-cover blur-xl" />
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight -bottom-0 absolute left-30 h-160% w-auto origin-bottom object-cover blur-xl" />
                </div>
            </TransitionFade>
        </div>
        <header class="pointer-events-none relative z-1 h-95 min-h-35 transition-all duration-800">
            <TransitionFade :duration="{ enter: 1200, leave: 600 }" :delay="{ enter: 600, leave: 0 }">
                <div v-if="currentRouteType === 'home'" class="pointer-events-none absolute left-22.5 top-12 h-58">
                    <Brand class="sticky top-12" />
                </div>
            </TransitionFade>
            <div class="sticky top-0 flex items-start justify-between px-22.5 py-12">
                <Navigation />
                <div class="flex gap-3">
                    <OptionsButton />
                    <Login />
                    <SearchBar />
                </div>
            </div>
            <TransitionFade :duration="{ enter: 1200, leave: 600 }" :delay="{ enter: 1200, leave: 0 }">
                <div v-if="currentRouteType === 'home' && lastWatchedMovie" class="pointer-events-auto absolute bottom-12 left-22.5 flex flex-col items-start gap-10">
                    <div>
                        <h1 class="mb-7">{{ lastWatchedMovie?.title }}</h1>
                        <p class="line-clamp-3 max-w-150 text-muted">{{ lastWatchedMovie?.overview }}</p>
                    </div>
                    <div class="flex items-center gap-2.5">
                        <NuxtLink :to="'/movie/' + lastWatchedMovie?.id" class="button">
                            <span class="i-ph-play-bold size-6" />
                            <span>Continue watching</span>
                        </NuxtLink>
                        <div class="button" @click="deleteFromLastWatched()"><span class="i-ph-minus-square-bold size-6" /></div>
                        <WatchlistButton :tmdb-id="lastWatchedMovie?.id" type="movie" />
                        <Rating :tmdb-id="lastWatchedMovie?.id" type="movie" :rating="lastWatchedMovie?.vote_average" size="large" class="mx-3" />
                    </div>
                </div>
                <div v-else-if="currentRouteType === 'home' && popularMovie" class="pointer-events-auto absolute bottom-12 left-22.5 flex flex-col items-start gap-10">
                    <div>
                        <h1 class="mb-7">{{ popularMovie?.title }}</h1>
                        <p class="line-clamp-3 max-w-150 text-muted">{{ popularMovie?.overview }}</p>
                    </div>
                    <div class="flex items-center gap-2.5">
                        <NuxtLink :to="'/movie/' + popularMovie?.id" class="button">
                            <span class="i-ph-play-bold size-6" />
                            <span>{{ $t("movieDetails.watchNow") }}</span>
                        </NuxtLink>
                        <WatchlistButton :tmdb-id="popularMovie?.id" type="movie" />
                        <Rating :tmdb-id="popularMovie?.id" type="movie" :rating="popularMovie?.vote_average" size="large" class="mx-3" />
                    </div>
                </div>
            </TransitionFade>
        </header>
        <div class="realtive flex-grow bg-primary/30 px-22.5 py-12 backdrop-blur">
            <main>
                <slot />
            </main>
            <footer class="mt-30 flex justify-between gap">
                <div class="flex items-center gap-4">
                    <NuxtLink to="https://www.themoviedb.org/" target="_blank">
                        <img src="~assets/images/TMDB/alt-short.svg" alt="TMDB Logo" class="block h-4" />
                    </NuxtLink>
                    <p class="text-muted">This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
                </div>
                <div>
                    <NuxtLink to="https://github.com/JGastager/MoviePort/issues" target="_blank" class="inline-block flex items-center gap-2.5">
                        <p class="text-muted">File an issue on GitHub</p>
                        <span class="i-custom-github size-7 text-muted" />
                    </NuxtLink>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useMoviesStore } from "~/store/movies";
import { useShowsStore } from "~/store/shows";

const movieStore = useMoviesStore();
const showsStore = useShowsStore();

const { movieDetails, popularMovies } = storeToRefs(movieStore);
const { tvShowDetails } = storeToRefs(showsStore);

const route = useRoute();
const currentRouteType = computed(() => {
    if (route.path === "/") {
        return "home";
    } else if (route.path.startsWith("/movie/")) {
        return "movie";
    } else if (route.path.startsWith("/tv/")) {
        return "tv";
    } else {
        return null;
    }
});

const lastWatchedTVShow = ref(null);
const lastWatchedMovie = ref(null);

const popularMovie = computed(() => {
    return popularMovies.value.results?.length ? popularMovies.value.results[0] : null;
});

const storedCountry = localStorage.getItem("userCountry");
if (!storedCountry) {
    const userLanguage = navigator.language || "en-US";
    const userCountry = userLanguage.slice(0, 2).toUpperCase(); // Extracts first two letters
    localStorage.setItem("userCountry", userCountry);
}

function deleteFromLastWatched() {
    lastWatchedMovie.value = null;
    localStorage.removeItem("lastWatchedMovie");
}

onMounted(() => {
    const storedShow = localStorage.getItem("lastWatchedTVShow");
    if (storedShow) {
        lastWatchedTVShow.value = JSON.parse(storedShow);
    }

    const storedMovie = localStorage.getItem("lastWatchedMovie");
    if (storedMovie) {
        lastWatchedMovie.value = JSON.parse(storedMovie);
    }
});
</script>

<style lang="scss">
html:has(#backdrop #player) header {
    height: 100vh;
}
html:has(.home-page) header {
    height: 600px;
}
html:has(.movies-page) header,
html:has(.tvs-page) header,
html:has(.persons-page) header,
html:has(.favorites-page) header,
html:has(.ratings-page) header,
html:has(.account-page) header,
html:has(.watchlist-page) header,
html:has(.person-page) header {
    height: 140px;
}
html:has(.movies-page):has(.search-bar.is-open) header,
html:has(.tvs-page):has(.search-bar.is-open) header,
html:has(.persons-page):has(.search-bar.is-open) header,
html:has(.favorites-page):has(.search-bar.is-open) header,
html:has(.ratings-page):has(.search-bar.is-open) header,
html:has(.account-page):has(.search-bar.is-open) header,
html:has(.watchlist-page):has(.search-bar.is-open) header,
html:has(.person-page):has(.search-bar.is-open) header {
    height: 380px;
    transition-duration: 250ms;
}

.custom-clip-gradient-home {
    mask-image: radial-gradient(closest-side, black, transparent);
    mask-size: 200% 175%;
    mask-repeat: no-repeat;
    mask-position: bottom left;
}

.custom-clip-gradient {
    mask-image: radial-gradient(closest-side, black, transparent);
    mask-size: 100% 175%;
    mask-repeat: no-repeat;
    mask-position: bottom center;
}
</style>
