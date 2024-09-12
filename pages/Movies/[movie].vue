<template>
    <div class="grid grid-cols-10 gap-15">
        <section class="col-span-2 h-full">
            <div class="sticky top-12">
                <div class="mb-10 flex flex-wrap gap-3">
                    <div class="px-4 button">
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
            <StarsSlider />
        </section>
        <section class="col-span-2 h-full">
            <div class="sticky top-12">
                <div class="mb-10 flex flex-wrap gap-3">
                    <div class="gap-1 px-4 button">
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
                    <div class="px-4 button">
                        <span class="i-ph-monitor-play-bold size-6" />
                        <span>Trailer</span>
                    </div>
                    <div class="px-4 button">
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
</template>

<script lang="ts" setup>
import Poster from '~/components/Poster.vue';


</script>

<style>

</style>