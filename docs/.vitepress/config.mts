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
    notFound: {
      title: 'СТОРІНКУ НЕ ЗНАЙДЕНО',
      quote: "Але якщо ви не зміните свій напрямок і продовжите шукати, ви можете опинитися там, куди прямуєте.",
      linkLabel: 'Повернутися на головну', // aria-label
      linkText: 'Повернутися на головну',
      code: '404'
    },
    nav: [
      { text: 'Головна', link: '/' },
      { text: 'Вікі', link: '/wiki/index.html' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Пошук',
                buttonAriaLabel: 'Пошук'
              },
              modal: {
                displayDetails: 'Показати деталі',
                resetButtonTitle: 'Скинути пошук',
                backButtonTitle: 'Закрити пошук',
                noResultsText: 'Немає результатів',
                footer: {
                  selectText: 'Обрати',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: 'Управляти',
                  navigateUpKeyAriaLabel: 'Up arrow',
                  navigateDownKeyAriaLabel: 'Down arrow',
                  closeText: 'Закрити',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
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
