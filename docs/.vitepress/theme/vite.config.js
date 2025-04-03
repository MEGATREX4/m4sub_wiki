import { defineConfig } from 'vitepress';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  vite: {
    plugins: [vue()],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'], // Ensure Vite resolves these extensions
    },
  },
  markdown: {
    config: (md) => {
      // Your custom markdown-it config...
    },
  },
});
