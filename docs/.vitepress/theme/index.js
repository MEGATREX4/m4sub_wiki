//index.js
import { h } from 'vue'  // ✅ Import h
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import CraftingGrid from '../theme/components/CraftingGrid.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'not-found': () => h(NotFound) // ✅ Ensure 'not-found' is in quotes
  }),

  enhanceApp({ app }) {
    app.component('CraftingGrid', CraftingGrid)
  }
}
