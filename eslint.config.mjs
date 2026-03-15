import unocss from "@unocss/eslint-config/flat";
import prettier from "eslint-config-prettier";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(unocss, prettier, {
    plugins: {},
    rules: {
        "vue/require-default-prop": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "vue/no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "unocss/order": "off",
    },
    ignores: ["node_modules/", "dist/", "public/", "coverage/", ".nuxt/", ".output/", ".vscode/", "**/*.min.js", "**/vendor/**"],
});
