import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'Ceiling',
  description: 'Just My Blog :-p',
  themeConfig: {
    repo: 'https://github.com/wsszh01111',
    editLink: false,
    contributors: false,
    home: '/index.md',
    navbar: [
      {
        text: '博客',
        link: '/blogs/',
      },
      {
        text: '知识',
        link: '/knowledge/',
      },
      {
        text: '想法',
        link: '/ideas/'
      }
    ],
    sidebar: {
      '/knowledge/': [
        {
          text: 'Knowledge',
          link: '/knowledge/',
          children: [{
            text: 'Books',
            link: '/knowledge/books/',
            children: [
              '/knowledge/books/《CSS世界》.md',
              '/knowledge/books/WebAssembly入门课.md',
            ]
          }, {
              text: 'CSS',
              link: '/knowledge/css/',
              children: [
                '/knowledge/css/display.md',
                '/knowledge/css/Replaced element.md',
                '/knowledge/css/writing-mode.md',
              ]
            }, {
              text: 'JS',
              link: '/knowledge/js/',
              children: [
                '/knowledge/js/RegExp.md',
                '/knowledge/js/class.md',
                '/knowledge/js/parseInt.md',
                '/knowledge/js/module.md',
                '/knowledge/js/bind.md',
                '/knowledge/js/toFixed and toExponential.md',
                '/knowledge/js/Trailing commas.md',
                '/knowledge/js/encoding function.md',
                '/knowledge/js/Currying.md',
              ]
            }, {
              text: 'Vue',
              link: '/knowledge/vue/',
              children: [
                {
                  text: 'Vue2',
                  link: '/knowledge/vue/vue2',
                  children: [
                    '/knowledge/vue/vue2/Reactive in vue2.md',
                  ]
                },
                {
                  text: 'Vue3',
                  link: '/knowledge/vue/vue3',
                  children: [
                    '/knowledge/vue/vue3/Composition API.md',
                    '/knowledge/vue/vue3/Reactive in vue3.md',
                  ]
                },
                {
                  text: 'Shared',
                  link: '/knowledge/vue/shared',
                }
              ]
            }, {
              text: 'Build',
              link: '/knowledge/build/',
              children: [
                {
                  text: 'Webpack',
                  link: '/knowledge/build/Webpack.md',
                }
              ]
            }, {
              text: 'Network',
              link: '/knowledge/network/',
              children: [
                '/knowledge/network/HTTPS.md',
              ]
            }, {
              text: 'Node',
              link: '/knowledge/node/',
              children: [
                '/knowledge/node/Shebang.md',
                '/knowledge/node/npm scripts.md',
                '/knowledge/node/npx.md',
                '/knowledge/node/API.md',
                '/knowledge/node/require.md',
              ]
            }, {
              text: 'Others',
              link: '/knowledge/others/',
              children: [
                '/knowledge/others/Tips.md',
                '/knowledge/others/Rust.md',
                '/knowledge/others/Browser pre-execute.md',
                '/knowledge/others/Programming paradigm.md',
                '/knowledge/others/Electron Model.md',
                '/knowledge/others/System Environment.md',
                '/knowledge/others/monorepo.md',
                '/knowledge/others/Process and thread.md',
                '/knowledge/others/Big O.md',
                '/knowledge/others/GUN.md',
              ]
          }]
        }
      ]
    }
  }
})