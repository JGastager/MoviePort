import unocss from '@unocss/eslint-config/flat'
import stylistic from '@stylistic/eslint-plugin'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    unocss,
    stylistic.configs.customize({
        flat: true,
        indent: 4,
        semi: false,
    }),
    {
        ignores: [
            'node_modules/',
            'dist/',
            '.nuxt/',
            'coverage/',
            'public/',
        ],
        rules: {
            'vue/max-attributes-per-line': 'off',
            'vue/first-attribute-linebreak': 'off',
        },
    },
).override('nuxt/vue/rules', {
    rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: false,
            ignores: [],
        }],
    },
})
