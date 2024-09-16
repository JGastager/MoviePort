// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            tmdbAuthToken: process.env.TMDB_AUTH_TOKEN,
        },
    },
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@unocss/nuxt', '@nuxt/eslint', '@nuxt/fonts'],
})