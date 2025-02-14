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
            'vue/max-attributes-per-line': ['error', {
                singleline: 5, // Allow up to 5 attributes on the same line
                multiline: 5, // Allow up to 5 attributes before breaking
            }],
            'vue/first-attribute-linebreak': 'off', // Prevent forced line breaks
        },
    },
)
