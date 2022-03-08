export const data = {
  "key": "v-76fdf177",
  "path": "/blogs/",
  "title": "asdf",
  "lang": "zh-CN",
  "frontmatter": {
    "navbar": true,
    "sidebar": false
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1646312980000
  },
  "filePathRelative": "blogs/README.md"
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
