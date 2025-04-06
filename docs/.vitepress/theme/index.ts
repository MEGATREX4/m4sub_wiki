import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import CraftingGrid from '../theme/components/CraftingGrid.vue'
import Item from '../theme/components/Item.vue'
import Structure from '../theme/components/Structure.vue'
import Mob from '../theme/components/Mob.vue'
import Player from './components/Player.vue'

import Clear from '../theme/components/Clear.vue'


import './style.css'

export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.mojang.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
    
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'not-found': () => h(NotFound)
  }),

  enhanceApp({ app }) {
    app.component('CraftingGrid', CraftingGrid)
    app.component('Item', Item)
    app.component('Structure', Structure)
    app.component('Mob', Mob)
    app.component('Player', Player)
    app.component('Clear', Clear)
  }
}

