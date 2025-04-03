import { h, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import CraftingGrid from '../theme/components/CraftingGrid.vue'
import MarkdownIt from 'markdown-it'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'not-found': () => h(NotFound)
  }),

  enhanceApp({ app }) {
    app.component('CraftingGrid', CraftingGrid)
  },

  markdown: {
    config: (md) => {
      md.use(checkLinksPlugin)
    }
  }
}

// Плагін для перевірки посилань
function checkLinksPlugin(md) {
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')

    if (hrefIndex !== -1) {
      const link = token.attrs[hrefIndex][1]

      if (link.startsWith('/')) {
        const pagePath = link.replace(/^\/|\.md$/g, '')
        const githubUrl = `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/docs/${pagePath}.md`

        // Додаємо тимчасовий клас, поки не перевіримо посилання
        token.attrPush(['class', 'checking-page'])

        // Використовуємо `setTimeout` для оновлення класу після рендеру
        setTimeout(async () => {
          const exists = await checkIfPageExists(githubUrl)
          const links = document.querySelectorAll(`a[href="${link}"]`)
          links.forEach(a => {
            a.classList.remove('checking-page')
            if (!exists) {
              a.classList.add('missing-page')
            }
          })
        }, 0)
      }
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

// Функція для перевірки, чи існує сторінка
async function checkIfPageExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}
