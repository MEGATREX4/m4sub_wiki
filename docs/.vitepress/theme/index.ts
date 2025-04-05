import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import CraftingGrid from '../theme/components/CraftingGrid.vue'
import Item from '../theme/components/Item.vue'
import Structure from '../theme/components/Structure.vue'
import Mob from '../theme/components/Mob.vue'


import './style.css'

export default {

    
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'not-found': () => h(NotFound)
  }),

  enhanceApp({ app }) {
    app.component('CraftingGrid', CraftingGrid)
    app.component('Item', Item)
    app.component('Structure', Structure)
    app.component('Mob', Mob)
  }
}

