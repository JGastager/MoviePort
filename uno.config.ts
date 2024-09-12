import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
  ],
  theme: {
    colors: {
      primary: '#707070',
    },
    borderRadius: {
      DEFAULT: '8px',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  shortcuts: {
    'backdrop-blur': 'backdrop-blur-2xl',
    card: 'rounded bg-primary/30 backdrop-blur',
    button: 'rounded bg-primary/30 backdrop-blur h-11 min-w-11 inline-flex items-center justify-center gap-2.5 cursor-pointer hover:bg-primary/50 transition-colors duration-300',
    'text-muted': 'text-white/50',
  },
})
