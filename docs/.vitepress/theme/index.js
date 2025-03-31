//index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import CraftingGrid from '../theme/components/CraftingGrid.vue'


export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  
  enhanceApp({ app }) {
    app.component('CraftingGrid', CraftingGrid)
  },
}
