// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            tmdbAuthToken: process.env.TMDB_AUTH_TOKEN,
            streamProviderDomain: process.env.STREAM_PROVIDER_DOMAIN,
        },
    },
    ssr: false,
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['nuxt-electron', '@unocss/nuxt', '@nuxt/eslint', '@nuxt/fonts'],
    electron: {
        disableDefaultOptions: true,
        build: [
            {
                // Main-Process entry file of the Electron App.
                entry: 'electron/main.ts',
            },
        ],
    },
    // app:{ cdnURL: './'},
})