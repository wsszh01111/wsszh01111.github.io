export const data = {
  "key": "v-003c11ac",
  "path": "/knowledge/",
  "title": "知识",
  "lang": "zh-CN",
  "frontmatter": {
    "navbar": true
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1646757230000
  },
  "filePathRelative": "knowledge/README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
