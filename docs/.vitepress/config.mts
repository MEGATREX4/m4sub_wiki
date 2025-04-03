import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

export default defineConfig(
  
  withSidebar({
    head: [
      ['link', { rel: 'icon', href: 'https://github.com/MEGATREX4/m4sub_wiki/blob/main/docs/logo.png?raw=true' }],
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
    ],
    lang: 'uk_UA',
    title: "M4sub Вікі",
    description: "Вікі по майнкрафт серверу m4sub",
    themeConfig: {
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
                button: { buttonText: 'Пошук', buttonAriaLabel: 'Пошук' },
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
      outline: {
        label: 'У цьому параграфі',
        level: 'deep',
    },
  
    docFooter: {
        prev: 'Попередня сторінка',
        next: 'Наступна сторінка',
    },
  
    lastUpdated: {
        text: 'Оновлено в',
        formatOptions: {
            dateStyle: 'full',
            timeStyle: 'medium'
        }
    },
      socialLinks: [
        { icon: 'twitch', link: 'https://twitch.tv/MEGATREX4' }
      ],
      editLink: {
        pattern: 'https://github.com/MEGATREX4/m4sub_wiki/edit/main/docs/:path',
        text: 'Редагувати цю сторінку на GitHub'
      }
    }
  },
  {
    documentRootPath: '/docs',
    manualSortFileNameByPriority:['wiki'],
    collapsed: false,
    capitalizeFirst: true,
    excludePattern: ['README.md'],
    sortMenusByName: false,
    debugPrint: false,
    hyphenToSpace: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderTitleFromIndexFile: true,
    frontmatterTitleFieldName: "title",
    keepMarkdownSyntaxFromTitle: false,
    useFolderLinkFromIndexFile: true,
    useFolderLinkFromSameNameSubFile: true,
    folderLinkNotIncludesFileName: true
  })
);
