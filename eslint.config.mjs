import unocss from '@unocss/eslint-config/flat';
import prettier from 'eslint-config-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    unocss,
    prettier,
    {
        ignores: [
            'node_modules/',
            'dist/',
            '.nuxt/',
            'coverage/',
            'public/'
        ],
        rules: {
            'indent': ['error', 4],
            'vue/max-attributes-per-line': ['error', {
                'singleline': 5,
                'multiline': 1
            }]
        }
    }
);