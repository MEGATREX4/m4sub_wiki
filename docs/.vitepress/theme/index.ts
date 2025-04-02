// index.ts
import { h } from 'vue'  // ✅ Import h
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CraftingGrid from '../theme/components/CraftingGrid.vue'
import NotFound from './NotFound.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound)  // ✅ Ensure 'not-found' is in quotes
    })
  },
  
  enhanceApp({ app }) {
    app.component('CraftingGrid', CraftingGrid)
  }
} satisfies Theme

