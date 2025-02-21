import { defineConfig, presetUno, presetIcons } from "unocss";

export default defineConfig({
    presets: [presetUno(), presetIcons()],
    safelist: ["animate-fly-in", "animate-fly-off", "animate-wiggle"],
    theme: {
        colors: {
            primary: "#707070",
        },
        borderRadius: {
            DEFAULT: "8px",
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
        width: {
            card: "calc((100vw - 180px - (28px * 6)) / 7)",
        },
        animation: {
            keyframes: {
                "fly-in": "{from{transform:scale(1.5);opacity:0}to{transform:scale(1);opacity:1}}",
                "fly-off": "{from{transform:scale(1);opacity:1}to{transform:scale(1.5);opacity:0}}",
                wiggle: "{from{transform:translateX(0px)}via{transform:translateX(6px)}via{transform:translateX(-6px)}to{transform:translateX(0px)}}", // TODO: Fix wiggle animation
            },
            durations: {
                "fly-in": "0.25s",
                "fly-off": "0.25s",
                wiggle: "0.3s",
            },
            timingFns: {
                "fly-in": "ease",
                "fly-off": "ease",
                wiggle: "ease",
            },
            counts: {
                "fly-in": 1,
                "fly-off": 1,
                wiggle: 1,
            },
        },
    },
    shortcuts: {
        "backdrop-blur": "backdrop-blur-2xl",
        card: "rounded bg-primary/30",
        button: "rounded bg-primary/30 px-4 h-11 min-w-11 inline-flex items-center justify-center gap-2.5 cursor-pointer hover:bg-primary/50 focus:bg-primary/50 transition-colors duration-300",
        tag: "rounded bg-primary/30 px-3 py-1 cursor-default inline-block",
        "text-muted": "text-white/50",
        gap: "gap-7",
        "absolute-center": "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
    },
    rules: [
        [
            "scrollbar-none",
            {
                "scrollbar-width": "none",
                "-ms-overflow-style": "none",
            },
        ],
        [
            /^scrollbar-none(::-webkit-scrollbar)?$/,
            () => ({
                display: "none",
            }),
        ],
    ],
});
