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
  }
})