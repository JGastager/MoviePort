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
                        <div class="button">
                            <span class="i-ph-bookmark-simple-bold size-6" />
                        </div>
                    </div>
                    <Poster :poster-path="details.poster_path" />
                </div>
            </section>
            <section class="col-span-6">
                <h1 class="mb-10">{{ details.name }}</h1>
                <p class="mb-10">
                    {{ details.overview }}
                </p>
                <Genres :genres="details.genres" class="mb-20" />
                <h2 class="mb-6">Seasons</h2>
                <div class="seasons mb-6 flex flex-wrap gap-3">
                    <div  v-for="season in details.seasons" :key="season.id" class="season gap-0 overflow-hidden button !pl-1"  :class="[activeSeason === season.season_number ? 'active' : null, season.season_number == 0 ? 'order-last' : null]" @click="activeSeason = season.season_number">
                        <div v-if="season.season_number == 0" class="ml-3">
                            Specials
                        </div>
                        <template v-else>
                            <span >Season</span>
                            <span class="ml-3">{{ season.season_number }}</span>
                        </template>
                    </div>
                </div>
                <TransitionScale group tag="div" class="episodes mb-10 flex flex-wrap gap-3">
                    <div v-for="episode in seasonDetails.episodes" :key="episode.id" class="episode button" @click="activeEpisode = episode.episode_number, triggerPlay()">
                        <span>Ep. {{ episode.episode_number }}</span>
                        <span class="text-14px text-muted">{{ episode.name }}</span>
                    </div>
                </TransitionScale>
                <!-- <pre>{{seasonDetails}}</pre> -->
                <CastSlider v-if="credits?.cast && credits?.cast.length" :cast="credits.cast" class="mb-10" />
                <ImageSlider v-if="movieId" :movie-id="movieId" />
            </section>
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-3">
                        <div class="gap-1 button">
                            <span class="i-ph-star-fill size-6" />
                            <span class="i-ph-star-fill size-6" />
                            <span class="i-ph-star-fill size-6" />
                            <span class="i-ph-star-bold size-6" />
                            <span class="i-ph-star-bold size-6" />
                        </div>
                    </div>
                    <div class="mb-10">
                        <div class="flex items-center justify-between gap-3">
                            <h3>Duration</h3>
                            <span class="text-muted">{{ details.runtime }} minutes</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>Release</h3>
                            <span class="text-muted">{{ $dayjs(details.release_date).get('year') }}</span>
                        </div>
                    </div>
                    <div class="mb-10 flex flex-wrap gap-3">
                        <Trailer type="tv" :tmdb-id="showId"/>
                        <!-- <NuxtLink :to="`https://www.imdb.com/title/${details.imdb_id}/`" target="_blank" class="button">
                            <span class="i-ph-film-slate-bold size-6" />
                            <span>IMDb</span>
                        </NuxtLink> -->
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
                    <div v-if="details?.production_companies?.length" class="mb-3 flex items-start justify-between gap-3">
                        <h3>Production</h3>
                        <ul class="m-0 p-0">
                            <li v-for="producer in details.production_companies" :key="producer.id" class="list-none text-right text-muted line-height-27px">
                                <span>{{ producer.name }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        <!-- <pre>{{ details }}</pre> -->
        <ShowListings v-if="similar?.results" title="Related TV shows" :shows="similar.results" />
        <Teleport v-if="details.backdrop_path" to="#backdrop">
            <img v-if="details?.backdrop_path" :src="$getImageUrl(details.backdrop_path, 'backdrop', 'w1280')" alt="Backdrop" class="h-full w-full object-cover">
            <img v-if="details?.backdrop_path" :src="$getImageUrl(details.backdrop_path, 'backdrop', 'original')" alt="Backdrop" class="absolute inset-0 h-full w-full object-cover">
            <TransitionFade>
                <Player v-if="play && details?.id" :tmdb-id="details.id" :season="activeSeason" :episode="activeEpisode" type="tv" />
            </TransitionFade>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router'

interface Crewmember {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string,
    job: string
}

const play = ref(false);

const details = ref({});
const credits = ref({});
const similar = ref([]);
const activeSeason = ref(1);
const activeEpisode = ref(1);
const seasonDetails = ref({});

const directors = computed(() => {
    return credits.value?.crew?.filter((crewmember: Crewmember) => crewmember.job === 'Director');
});
const composers = computed(() => {
    return credits.value?.crew?.filter((crewmember: Crewmember) => crewmember.job === 'Original Music Composer');
});
const writers = computed(() => {
    return credits.value?.crew?.filter((crewmember: Crewmember) => crewmember.job === 'Writer');
});

const route = useRoute()
const { fetchTMDB } = useTMDB();

const showId = route.params.id;

watch(activeSeason, async (newSeason) => {
    try {
        seasonDetails.value = await fetchTMDB(`/tv/${showId}/season/${newSeason}`);
        console.log('Season details:', seasonDetails);
    } catch (error) {
        console.error('Error loading season details:', error);
    }
});

onMounted(async () => {
    
    console.log('TV Show ID:', showId);

    try {
        details.value = await fetchTMDB('/tv/' + showId);
        console.log('TV Show details:', details.value);
        useHead({
            title: `${details.value?.name} | MoviePort`,
        })
    } catch (error) {
        console.error('Error loading TV show details:', error);
    }
    try {
        credits.value = await fetchTMDB('/tv/' + showId + '/credits');
        console.log('TV Show credits:', credits.value);
    } catch (error) {
        console.error('Error loading TV show credits:', error);
    }
    try {
        seasonDetails.value = await fetchTMDB(`/tv/${showId}/season/${activeSeason.value}`);
        console.log('Season details:', seasonDetails);
    } catch (error) {
        console.error('Error loading season details:', error);
    }
    try {
        similar.value = await fetchTMDB('/tv/' + showId + '/similar');
        console.log('Similar TV shows:', similar.value);
    } catch (error) {
        console.error('Error loading similar TV shows:', error);
    }
});

function triggerPlay() {
    play.value = true;
    if(play.value) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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