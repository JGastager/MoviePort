<template>
    <div>
        <div class="grid grid-cols-10 mb-30 gap-15">
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-3">
                        <div class="button" @click="play = true">
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
                <h1 class="mb-10">{{ details.title }}</h1>
                <p class="mb-10">
                    {{ details.overview }}
                </p>
                <Genres :genres="details.genres" class="mb-10" />
                <CastSlider v-if="credits?.cast" :cast="credits.cast" />
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
                            <span class="text-muted">{{ details.release_date }}</span>
                        </div>
                    </div>
                    <div class="mb-10 flex flex-wrap gap-3">
                        <div class="button">
                            <span class="i-ph-monitor-play-bold size-6" />
                            <span>Trailer</span>
                        </div>
                        <div class="button">
                            <span class="i-ph-film-slate-bold size-6" />
                            <span>IMDb</span>
                        </div>
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
        <pre>{{ details }}</pre>
        <MovieListings v-if="similar?.results" title="Related movies" :movies="similar.results" />
        <Teleport to="#backdrop">
            <img :src="$getImageUrl(details.backdrop_path, 'backdrop', 'w1280')" alt="Backdrop" class="h-full w-full object-cover">
            <img :src="$getImageUrl(details.backdrop_path, 'backdrop', 'original')" alt="Backdrop" class="absolute inset-0 h-full w-full object-cover">
            <Player v-if="play" :tmdb-id="details.id" type="movie" />
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'

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

const movieId = route.params.id;

onMounted(async () => {
    
    console.log('Movie ID:', movieId);

    try {
        const response = await fetchTMDB('/movie/' + movieId);
        details.value = response;
        console.log('Movie details:', details.value);
    } catch (error) {
        console.error('Error loading movie details:', error);
    }
    try {
        const response = await fetchTMDB('/movie/' + movieId + '/credits');
        credits.value = response;
        console.log('Movie credits:', credits.value);
    } catch (error) {
        console.error('Error loading movie credits:', error);
    }
    try {
        const response = await fetchTMDB('/movie/' + movieId + '/similar');
        similar.value = response;
        console.log('Similar movies:', similar.value);
    } catch (error) {
        console.error('Error loading similar movies:', error);
    }
});
</script>

<style>

</style>