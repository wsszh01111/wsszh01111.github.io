export const themeData = {
  "repo": "https://github.com/wsszh01111",
  "editLink": false,
  "contributors": false,
  "home": "/index.md",
  "navbar": [
    {
      "text": "博客",
      "link": "/blogs/"
    },
    {
      "text": "知识",
      "link": "/knowledge/"
    },
    {
      "text": "想法",
      "link": "/ideas/"
    }
  ],
  "sidebar": {
    "/knowledge/": [
      {
        "text": "知识",
        "link": "/knowledge/",
        "children": [
          {
            "text": "书",
            "link": "/knowledge/books/",
            "children": [
              "/knowledge/books/《CSS世界》.md",
              "/knowledge/books/WebAssembly入门课.md"
            ]
          }
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "logo": null,
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
