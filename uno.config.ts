import { defineConfig, presetUno, presetIcons } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import { compareColors, stringToColor } from "@iconify/utils/lib/colors";
import { importDirectory, parseColors, runSVGO, deOptimisePaths } from "@iconify/tools";
import type { IconifyJSON } from "@iconify/types";

export default defineConfig({
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
        breakpoints: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            "3xl": "2080px",
            "4xl": "2440px",
        },
        spacing: {
            margin: "var(--grid-margin)",
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
        "grid-media-cards": "3xl:grid-cols-8 4xl:grid-cols-9 grid grid-cols-2 2xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xl:grid-cols-6 gap-7",
        "w-media-card":
            "w-[calc((100vw-(var(--grid-margin)*2)-var(--grid-gutter))/2)] sm:w-[calc((100vw-(var(--grid-margin)*2)-(var(--grid-gutter)*2))/3)] md:w-[calc((100vw-(var(--grid-margin)*2)-(var(--grid-gutter)*3))/4)] lg:w-[calc((100vw-(var(--grid-margin)*2)-(var(--grid-gutter)*4))/5)] xl:w-[calc((100vw-(var(--grid-margin)*2)-(var(--grid-gutter)*5))/6)] 2xl:w-[calc((100vw-(var(--grid-margin)*2)-(var(--grid-gutter)*6))/7)] 3xl:w-[calc((100vw-(var(--grid-margin)*2)-(var(--grid-gutter)*7))/8)] 4xl:w-[calc((100vw-(var(--grid-margin)*2)-(var(--grid-gutter)*8))/9)]",
    },
    variants: [
        (matcher) => {
            if (matcher.startsWith("-")) {
                return {
                    matcher: matcher.slice(1),
                    selector: (s) => `${s}\\:neg`,
                };
            }
        },
    ],
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
    transformers: [transformerDirectives()],
    presets: [
        presetUno(),
        presetIcons({
            prefix: "i-",
            autoInstall: false,
            collections: {
                // Loading IconifyJSON data
                // test: async () => {
                //     const content = await fs.readFile("./assets/test.json", "utf8");
                //     return JSON.parse(content);
                // },
                // Loading icon set
                // Moved to a separate function to make it easier to understand and reuse it
                custom: async (): Promise<IconifyJSON> => {
                    // Load icons
                    const iconSet = await importDirectory("assets/icons", {
                        prefix: "svg",
                    });

                    // Clean up each icon
                    await iconSet.forEach(async (name) => {
                        const svg = iconSet.toSVG(name)!;

                        // Change color to `currentColor`
                        const blackColor = stringToColor("black")!;

                        await parseColors(svg, {
                            defaultColor: "currentColor",
                            callback: (attr, colorStr, color) => {
                                // Change black to "currentColor"
                                if (color && compareColors(color, blackColor)) {
                                    return "currentColor";
                                }

                                switch (color?.type) {
                                    case "none":
                                    case "current":
                                        return color;
                                }

                                throw new Error(`Unexpected color "${colorStr}" in attribute ${attr}`);
                            },
                        });

                        // Optimise
                        runSVGO(svg);

                        // Update paths for compatibility with old software
                        await deOptimisePaths(svg);

                        // Update icon in icon set
                        iconSet.fromSVG(name, svg);
                    });

                    // Export as IconifyJSON
                    return JSON.parse(JSON.stringify(iconSet.export()));
                },
            },
        }),
    ],
});
