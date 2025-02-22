<template>
    <div class="min-h-screen flex flex-col">
        <div id="backdrop" class="fixed top-0 h-screen w-full">
            <TransitionFade :duration="{ enter: 1200, leave: 600 }" :delay="{ enter: 600, leave: 0 }">
                <img v-if="currentRouteType === 'movie' && movieDetails?.backdrop_path" :src="$getImageUrl(movieDetails.backdrop_path, 'backdrop', 'original')" alt="Backdrop" class="custom-clip-gradient mx-auto block h-5/6 w-auto object-cover" />
                <img v-else-if="currentRouteType === 'tv' && tvShowDetails?.backdrop_path" :src="$getImageUrl(tvShowDetails.backdrop_path, 'backdrop', 'original')" alt="Backdrop" class="custom-clip-gradient mx-auto block h-5/6 w-auto object-cover" />
                <img
                    v-else-if="currentRouteType === 'home' && lastWatchedMovie?.backdrop_path"
                    :src="$getImageUrl(lastWatchedMovie.backdrop_path, 'backdrop', 'original')"
                    alt="Backdrop"
                    class="custom-clip-gradient-home ml-auto mr-0 block h-5/6 w-auto object-cover"
                />
                <div v-else class="fixed top-0 h-screen w-full">
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight pointer-events-none absolute h-190% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -right-30" />
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight-2 pointer-events-none absolute h-185% w-auto origin-bottom object-cover blur-2xl -bottom-2/3 -left-30" />
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight-2 -bottom-0 pointer-events-none absolute right-30 h-165% w-auto origin-bottom object-cover blur-xl" />
                    <img src="~assets/images/spotlight.svg" alt="spotlight" class="spotlight -bottom-0 pointer-events-none absolute left-30 h-160% w-auto origin-bottom object-cover blur-xl" />
                </div>
            </TransitionFade>
        </div>
        <header class="pointer-events-none relative z-1 h-86 min-h-35 transition-all duration-800">
            <TransitionFade :duration="{ enter: 1200, leave: 600 }" :delay="{ enter: 600, leave: 0 }">
                <Brand v-if="currentRouteType === 'home'" />
            </TransitionFade>
            <div class="sticky top-0 flex items-start justify-between px-22.5 py-12">
                <Navigation />
                <div class="flex gap-3">
                    <OptionsButton />
                    <!-- <AccountButton /> -->
                    <Login />
                    <SearchBar />
                </div>
            </div>
            <TransitionFade :duration="{ enter: 1200, leave: 600 }" :delay="{ enter: 600, leave: 0 }">
                <div v-if="currentRouteType === 'home' && lastWatchedMovie" class="pointer-events-auto absolute bottom-12 left-22.5 flex flex-col items-start gap-10">
                    <div>
                        <h1 class="mb-5">{{ lastWatchedMovie.title }}</h1>
                        <h3 class="mb-7">{{ lastWatchedMovie.tagline }}</h3>
                        <p class="line-clamp-3 max-w-150 text-muted">{{ lastWatchedMovie.overview }}</p>
                    </div>
                    <div class="button">
                        <span class="i-ph-play-bold size-6" />
                        <span>Continue watching</span>
                    </div>
                </div>
            </TransitionFade>
        </header>
        <main class="realtive flex-grow bg-primary/30 px-22.5 py-12 backdrop-blur">
            <div>
                <slot />
            </div>
            <div class="mt-30 flex items-center gap-4">
                <NuxtLink to="https://www.themoviedb.org/" target="_blank">
                    <img src="~assets/images/TMDB/alt-short.svg" alt="TMDB Logo" class="block h-4" />
                </NuxtLink>
                <p class="text-muted">This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
            </div>
        </main>
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

const { movieDetails } = storeToRefs(movieStore);
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
    height: 520px;
}
html:has(.movies-page) header,
html:has(.tvs-page) header,
html:has(.persons-page) header {
    height: 140px;
}
html:has(.movies-page):has(.search-bar.is-open) header,
html:has(.tvs-page):has(.search-bar.is-open) header,
html:has(.persons-page):has(.search-bar.is-open) header {
    height: 344px;
    transition-duration: 250ms;
}

.custom-clip-gradient-home {
    mask-image: radial-gradient(closest-side, black, transparent);
    mask-size: 200% 180%;
    mask-repeat: no-repeat;
    mask-position: bottom left;
}

.custom-clip-gradient {
    mask-image: radial-gradient(closest-side, black, transparent);
    mask-size: 100% 180%;
    mask-repeat: no-repeat;
    mask-position: bottom center;
}
</style>
