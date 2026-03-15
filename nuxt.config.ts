// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["nuxt-pages-plus", "nuxt-electron", "@unocss/nuxt", "@nuxt/eslint", "@nuxt/fonts", "@morev/vue-transitions/nuxt", "@pinia/nuxt", "@nuxtjs/i18n", "nuxt-viewport"],
    ssr: false,
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
    spaLoadingTemplate: "spa-loading-template.html",
    runtimeConfig: {
        public: {
            tmdbAuthToken: process.env.TMDB_AUTH_TOKEN,
            streamProviderDomain: process.env.STREAM_PROVIDER_DOMAIN,
            tmdbBaseUrl: process.env.TMDB_BASE_URL,
        },
    },
    compatibilityDate: "2024-04-03",
    vite: {
        optimizeDeps: {
            include: ["@vue/devtools-core", "@vue/devtools-kit", "dayjs", "@vueuse/core"],
        },
    },
    electron: {
        disableDefaultOptions: true,
        build: [
            {
                // Main-Process entry file of the Electron App.
                entry: "electron/main.ts",
            },
            {
                entry: "electron/preload.ts",
                vite: {
                    build: {
                        rollupOptions: {
                            output: {
                                format: "cjs",
                            },
                        },
                    },
                },
                onstart(args) {
                    args.reload();
                },
            },
        ],
    },
    // app:{ cdnURL: './'},
    eslint: {
        checker: true,
        config: {
            stylistic: true,
        },
    },
    i18n: {
        defaultLocale: "en",
        lazy: true,
        strategy: "no_prefix",
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "de", name: "Deutsch", file: "de.json" },
        ],
        skipSettingLocaleOnNavigate: true,
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            alwaysRedirect: false,
            fallbackLocale: "en",
        },
    },
    viewport: {
        breakpoints: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
            "3xl": 2080,
            "4xl": 2440,
        },
    },
});
