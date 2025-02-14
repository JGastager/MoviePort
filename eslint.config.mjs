import unocss from '@unocss/eslint-config/flat';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    unocss,
    prettier, // Disables conflicting ESLint rules
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    semi: true,
                    singleQuote: false,
                    tabWidth: 4,
                    useTabs: false,
                    printWidth: 250,
                    endOfLine: 'auto',
                },
            ],
        },
    },
);
