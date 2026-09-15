/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme. `bg` is the page, `surface` is anything raised off it.
        bg: '#0B0D12',
        surface: '#12151C',
        'surface-2': '#181C25',
        fg: '#F2F1ED',
        muted: '#939AA8',
        accent: '#5B76FF',
        'accent-soft': '#A9B8FF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.045em' },
      maxWidth: { shell: '84rem', prose: '60ch' },
      borderRadius: { card: '1.25rem' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
}
