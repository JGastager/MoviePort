// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    /* 'nuxt-electron', */ '@unocss/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@morev/vue-transitions/nuxt',
    '@pinia/nuxt',
  ],
  ssr: false,
  devtools: { enabled: true }, runtimeConfig: {
    public: {
      tmdbAuthToken: process.env.TMDB_AUTH_TOKEN,
      streamProviderDomain: process.env.STREAM_PROVIDER_DOMAIN,
      tmdbBaseUrl: process.env.TMDB_BASE_URL,
    },
  },
  compatibilityDate: '2024-04-03',
  /*    electron: {
        disableDefaultOptions: true,
        build: [
            {
                // Main-Process entry file of the Electron App.
                entry: 'electron/main.ts',
            },
        ],
    }, */
  // app:{ cdnURL: './'},
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
})
