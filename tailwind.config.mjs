/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ['Minecraft', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#c5629a',
        'accent-dark': '#9c3b71',
        bg: '#0a0a12',
        bg2: '#130217',
        border: '#4a1f38',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}