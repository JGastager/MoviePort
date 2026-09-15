<template>
    <div class="min-h-screen flex flex-col">
        <div id="backdrop" class="pointer-events-none fixed top-0 h-screen w-screen">
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
                    v-else-if="currentRouteType === 'home' && (continueWatching?.backdropPath || popularMovie?.backdrop_path)"
                    v-parallax
                    :src="$getImageUrl(continueWatching ? continueWatching.backdropPath : popularMovie?.backdrop_path, 'backdrop', 'original')"
                    alt="Backdrop"
                    class="custom-clip-gradient-home ml-auto mr-0 block h-125vw max-h-230 max-w-screen w-auto object-cover"
                />
                <div v-else>
                    <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight absolute h-190% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -right-30" />
                    <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight-2 absolute h-185% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -left-30" />
                    <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight-2 -bottom-0 absolute right-30 h-165% w-auto origin-bottom object-cover blur-xl" />
                    <img src="~assets/images/spotlight.svg" loading="lazy" alt="spotlight" class="spotlight -bottom-0 absolute left-30 h-160% w-auto origin-bottom object-cover blur-xl" />
                </div>
            </TransitionFade>
            <Player v-if="player.play && player.tmdbId && player.type && player.selectedProvider" :tmdb-id="player.tmdbId" :type="player.type" :season="player.season" :episode="player.episode" :domain="player.selectedProvider.provider_link" />
        </div>
        <header class="pointer-events-none relative z-1 h-95 min-h-35 transition-all duration-800">
            <div class="sticky top-0 flex items-start justify-between px-margin py-12">
                <Navigation />
                <div class="flex gap-3">
                    <OptionsButton />
                    <LoginButton />
                    <SearchBar />
                </div>
            </div>
            <TransitionFade :duration="{ enter: 1800, leave: 600 }" :delay="{ enter: 1200, leave: 0 }">
                <div v-if="currentRouteType === 'home'" class="pointer-events-auto absolute bottom-0 left-0 h-full flex flex-col items-start justify-end gap-10 px-margin py-12">
                    <div class="pointer-events-none flex-grow pb-10">
                        <Brand class="sticky top-12" />
                    </div>
                    <template v-if="continueWatching">
                        <NuxtLink :to="continueWatching.link" group="group">
                            <h1 class="relative mb-6 inline-block">
                                {{ continueWatching.title }}
                            </h1>
                            <p class="line-clamp-3 max-w-150 text-muted">
                                {{ continueWatching.overview }}
                            </p>
                        </NuxtLink>
                        <div class="flex flex-wrap items-center gap-2.5 gap-y-5">
                            <NuxtLink :to="continueWatching.link" class="button">
                                <span class="i-ph-play-bold size-6" />
                                <span>Continue watching</span>
                            </NuxtLink>
                            <div class="button" @click="deleteFromLastWatched()">
                                <span class="i-ph-minus-square-bold size-6" />
                            </div>
                            <WatchlistButton :tmdb-id="continueWatching.id" :type="continueWatching.type" />
                            <Rating :tmdb-id="continueWatching.id" :type="continueWatching.type" :rating="continueWatching.voteAverage" size="large" class="mx-3" />
                        </div>
                    </template>
                    <template v-else-if="popularMovie">
                        <NuxtLink :to="'/movie/' + popularMovie?.id" class="group">
                            <h1 class="relative mb-6 inline-block">
                                {{ popularMovie?.title }}
                            </h1>
                            <p class="line-clamp-3 max-w-150 text-muted">
                                {{ popularMovie?.overview }}
                            </p>
                        </NuxtLink>
                        <div class="flex flex-wrap items-center gap-2.5 gap-y-5">
                            <NuxtLink :to="'/movie/' + popularMovie?.id" class="button">
                                <span class="i-ph-film-strip-bold size-6" />
                                <span>More details</span>
                            </NuxtLink>
                            <WatchlistButton :tmdb-id="popularMovie?.id" type="movie" />
                            <Rating :tmdb-id="popularMovie?.id" type="movie" :rating="popularMovie?.vote_average" size="large" class="mx-3" />
                        </div>
                    </template>
                </div>
            </TransitionFade>
        </header>
        <div class="relative flex flex-grow flex-col px-margin py-12">
            <div class="absolute inset-0 z-0 bg-primary/30 backdrop-blur"></div>
            <main class="relative">
                <slot />
            </main>
            <FooterInfos />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useMoviesStore } from "~/store/movies";
import { useShowsStore } from "~/store/shows";
import { usePlayerStore } from "~/store/player";
import type { LastWatchedMovie } from "~/types/movieDetails";
import type { LastWatchedTVShow } from "~/types/tvshowDetails";

const movieStore = useMoviesStore();
const showsStore = useShowsStore();

const { movieDetails, popularMovies } = storeToRefs(movieStore);
const { tvShowDetails } = storeToRefs(showsStore);
const player = usePlayerStore();

const route = useRoute();
let lastRouteType: string | null = null;
const currentRouteType = computed(() => {
    if (route.path === "/") {
        lastRouteType = "home";
        return "home";
    } else if (route.path.startsWith("/movie/")) {
        lastRouteType = "movie";
        return "movie";
    } else if (route.path.startsWith("/tv/")) {
        lastRouteType = "tv";
        return "tv";
    } else if (route.path === "/login") {
        return lastRouteType;
    } else {
        lastRouteType = null;
        return null;
    }
});

const lastWatchedTVShow = ref<LastWatchedTVShow | null>(null);
const lastWatchedMovie = ref<LastWatchedMovie | null>(null);

const popularMovie = computed(() => {
    return popularMovies.value.results?.length ? popularMovies.value.results[0] : null;
});

const continueWatching = computed(() => {
    if (lastWatchedMovie.value && (!lastWatchedTVShow.value || lastWatchedMovie.value.watchedAt >= lastWatchedTVShow.value.watchedAt)) {
        const movie = lastWatchedMovie.value.movie;
        return {
            type: "movie" as const,
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdropPath: movie.backdrop_path,
            voteAverage: movie.vote_average,
            link: `/movie/${movie.id}`,
        };
    }
    if (lastWatchedTVShow.value) {
        const { show, season } = lastWatchedTVShow.value;
        return {
            type: "tv" as const,
            id: show.id,
            title: show.name,
            overview: show.overview,
            backdropPath: show.backdrop_path,
            voteAverage: show.vote_average,
            link: `/tv/${show.id}?season=${season}`,
        };
    }
    return null;
});

const storedCountry = localStorage.getItem("userCountry");
if (!storedCountry) {
    const userLanguage = navigator.language || "en-US";
    const userCountry = userLanguage.slice(0, 2).toUpperCase(); // Extracts first two letters
    localStorage.setItem("userCountry", userCountry);
}

function deleteFromLastWatched() {
    if (continueWatching.value?.type === "tv") {
        lastWatchedTVShow.value = null;
        localStorage.removeItem("lastWatchedTVShow");
    } else {
        lastWatchedMovie.value = null;
        localStorage.removeItem("lastWatchedMovie");
    }
}

onMounted(() => {
    // Guard against a pre-existing raw show/movie object from an older app version
    // (stored before this "continue watching" record shape existed).
    const storedShow = localStorage.getItem("lastWatchedTVShow");
    if (storedShow) {
        const parsedShow = JSON.parse(storedShow);
        if (parsedShow?.show?.id) {
            lastWatchedTVShow.value = parsedShow;
        } else {
            localStorage.removeItem("lastWatchedTVShow");
        }
    }

    const storedMovie = localStorage.getItem("lastWatchedMovie");
    if (storedMovie) {
        const parsedMovie = JSON.parse(storedMovie);
        if (parsedMovie?.movie?.id) {
            lastWatchedMovie.value = parsedMovie;
        } else {
            localStorage.removeItem("lastWatchedMovie");
        }
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
html:has(.person-page) header,
html:has(.search-page) header {
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
    mask-position: bottom left 25%;
    @screen sm {
        mask-position: bottom left;
    }
}

.custom-clip-gradient {
    mask-image: radial-gradient(closest-side, black, transparent);
    mask-size: 100% 175%;
    mask-repeat: no-repeat;
    mask-position: bottom center;
}
</style>
