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
    width: {
      card: 'calc((100vw - 180px - (28px * 6)) / 7)'
    }
  },
  shortcuts: {
    'backdrop-blur': 'backdrop-blur-2xl',
    card: 'rounded bg-primary/30',
    button: 'rounded bg-primary/30 px-4 h-11 min-w-11 inline-flex items-center justify-center gap-2.5 cursor-pointer hover:bg-primary/50 focus:bg-primary/50 transition-colors duration-300',
    tag: 'rounded bg-primary/30 px-3 py-1 cursor-default inline-block',
    'text-muted': 'text-white/50',
    gap: 'gap-7',
  },
})
