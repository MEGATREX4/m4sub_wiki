//index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import CraftingGrid from '../theme/components/CraftingGrid.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'not-found': () => h(NotFound)
  }),



  enhanceApp({ app }) {
    app.component('CraftingGrid', CraftingGrid)
  }
}
