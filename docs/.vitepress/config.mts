//config.mts
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  head: [
    ['link', { rel: 'icon', href: 'https://github.com/MEGATREX4/MTTutorials/blob/main/docs/logo.png?raw=true' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
  ],
  lang: 'uk_ua',
  
  title: "M4sub Вікі",
  description: "Вікі по майнкрафт серверу m4sub",
  themeConfig: {

    nav: [
      { text: 'Головна', link: '/' },
      { text: 'Вікі', link: '/wiki/index.html' }
    ],

    sidebar: [
      {
        text: 'Сторінки',
        items: [
          { text: 'Інтро', link: '/wiki/index.html' },
          { text: 'Як доєднатись до m4sub', link: '/wiki/join.html' },
          { text: 'Власні скрипти', link: '/wiki/scripts.html' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'twitch', link: 'https://twitch.tv/MEGATREX4' }
    ],
    editLink: {
      pattern: 'https://github.com/MEGATREX4/MTTutorials/edit/main/docs/:path',
      text: 'Редагувати цю сторінку на GitHub'
    }
  }
})
