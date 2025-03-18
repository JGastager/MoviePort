// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [/* 'nuxt-electron', */ "@unocss/nuxt", "@nuxt/eslint", "@nuxt/fonts", "@morev/vue-transitions/nuxt", "@pinia/nuxt", "@nuxtjs/i18n"],
    ssr: false,
    spaLoadingTemplate: 'spa-loading-template.html',
    devtools: { enabled: true },
    app: {
        pageTransition: { name: "page", mode: "out-in" },
        head: {
            link: [
                { rel: "icon", href: "/favicon.ico", sizes: "64x64" },
                { rel: "icon", href: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
            ],
        },
    },
    runtimeConfig: {
        public: {
            tmdbAuthToken: process.env.TMDB_AUTH_TOKEN,
            streamProviderDomain: process.env.STREAM_PROVIDER_DOMAIN,
            tmdbBaseUrl: process.env.TMDB_BASE_URL,
        },
    },
    compatibilityDate: "2024-04-03",
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
    i18n: {
        vueI18n: "./i18n.config.ts",
        strategy: "no_prefix",
        locales: [
            {
                code: "en",
                name: "English",
            },
            {
                code: "de",
                name: "Deutsch",
            },
        ],
        skipSettingLocaleOnNavigate: true,
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            alwaysRedirect: false,
            fallbackLocale: "en",
        },
    },
});
