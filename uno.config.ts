import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
    presets: [
      presetUno(),
    ],
    theme: {
        colors: {
          primary: '#707070',
        },
        borderRadius: {
          DEFAULT: '8px',
        },
    },
    shortcuts: {
      'backdrop-blur': 'backdrop-blur-2xl',
      card: 'rounded bg-primary/30 backdrop-blur',
    },
})
