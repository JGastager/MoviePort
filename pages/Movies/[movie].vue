<template>
    <div>
        <div class="grid grid-cols-10 mb-30 gap-15">
            <section class="col-span-2 h-full">
                <div class="sticky top-12">
                    <div class="mb-10 flex flex-wrap gap-3">
                        <div class="button">
                            <span class="i-ph-play-bold size-6" />
                            <span>Watch now</span>
                        </div>
                        <div class="button">
                            <span class="i-ph-bookmark-simple-bold size-6" />
                        </div>
                    </div>
                    <Poster />
                </div>
            </section>
            <section class="col-span-6">
                <h1 class="mb-10">Star Trek: Beyond</h1>
                <p class="mb-10">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, sed, nemo, sunt aliquid nisi doloremque totam fuga dicta esse hic numquam tempora. Consequatur nostrum vitae blanditiis voluptatibus, veritatis eum obcaecati.
                </p>
                <StarsSlider :stars="stars" />
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
                            <span class="text-muted">123 minutes</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>Release</h3>
                            <span class="text-muted">2016</span>
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
                    <div class="mb-10">
                        <div class="flex items-center justify-between gap-3">
                            <h3>Director</h3>
                            <span class="text-muted">Justin Lin</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>Script</h3>
                            <span class="text-muted">Simon Pegg</span>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <h3>Score</h3>
                            <span class="text-muted">Michael Giacchino</span>
                        </div>
                    </div>
                    <div class="flex items-start justify-between gap-3">
                        <h3>Cast</h3>
                        <ul class="m-0 p-0">
                            <li class="flex items-center">
                                <span class="text-muted">Chris Pine</span>
                            </li>
                            <li class="flex items-center">
                                <span class="text-muted">Idris Elba</span>
                            </li>
                            <li class="flex items-center">
                                <span class="text-muted">Zachary Quinto</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        <MovieListings title="Related movies" :movies="movies" />
    </div>
</template>

<script lang="ts" setup>
import Poster from '~/components/Poster.vue';

const stars = [
    {
        name: 'Chris Pine',
        character: 'Captain James T. Kirk',
        image: '~/assets/images/chris-pine.jpg'
    },
    {
        name: 'Zachary Quinto',
        character: 'Commander Spock',
        image: '~/assets/images/zachary-quinto.jpg'
    },
    {
        name: 'Karl Urban',
        character: 'Dr. Leonard "Bones" McCoy',
        image: '~/assets/images/karl-urban.jpg'
    },
    {
        name: 'Simon Pegg',
        character: 'Montgomery "Scotty" Scott',
        image: '~/assets/images/simon-pegg.jpg'
    },
    {
        name: 'Zoe Saldana',
        character: 'Lieutenant Nyota Uhura',
        image: '~/assets/images/zoe-saldana.jpg'
    },
    {
        name: 'John Cho',
        character: 'Lieutenant Hikaru Sulu',
        image: '~/assets/images/john-cho.jpg'
    },
    {
        name: 'Anton Yelchin',
        character: 'Ensign Pavel Chekov',
        image: '~/assets/images/anton-yelchin.jpg'
    },
    {
        name: 'Idris Elba',
        character: 'Krall',
        image: '~/assets/images/idris-elba.jpg'
    }
];

const movies = [
    {
        id: 1,
        title: 'Star Trek: Beyond',
        release_date: '2016',
        runtime: 122,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 2,
        title: 'Star Trek: Into Darkness',
        release_date: '2013',
        runtime: 132,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 3,
        title: 'Star Trek',
        release_date: '2009',
        runtime: 127,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 4,
        title: 'Star Trek: The Motion Picture',
        release_date: '1979',
        runtime: 132,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 5,
        title: 'Star Trek II: The Wrath of Khan',
        release_date: '1982',
        runtime: 113,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 6,
        title: 'Star Trek III: The Search for Spock',
        release_date: '1984',
        runtime: 105,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 7,
        title: 'Star Trek IV: The Voyage Home',
        release_date: '1986',
        runtime: 119,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 8,
        title: 'Star Trek V: The Final Frontier',
        release_date: '1989',
        runtime: 107,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 9,
        title: 'Star Trek VI: The Undiscovered Country',
        release_date: '1991',
        runtime: 113,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 10,
        title: 'Star Trek: Generations',
        release_date: '1994',
        runtime: 118,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 11,
        title: 'Star Trek: First Contact',
        release_date: '1996',
        runtime: 111,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 12,
        title: 'Star Trek: Insurrection',
        release_date: '1998',
        runtime: 103,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 13,
        title: 'Star Trek: Nemesis',
        release_date: '2002',
        runtime: 116,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 14,
        title: 'Star Trek',
        release_date: '2009',
        runtime: 127,
        poster_path: '~/assets/images/poster.jpg'
    },
    {
        id: 15,
        title: 'Star Trek Into Darkness',
        release_date: '2013',
        runtime: 132,
        poster_path: '~/assets/images/poster.jpg'
    },
]
</script>

<style>

</style>