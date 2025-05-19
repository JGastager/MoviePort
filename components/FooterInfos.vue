<template>
    <footer class="relative mt-30 flex flex-grow items-end justify-between gap">
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
</template>

<script setup lang="ts"></script>
