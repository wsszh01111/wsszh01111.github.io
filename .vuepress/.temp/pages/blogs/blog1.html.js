export const data = {
  "key": "v-482a23be",
  "path": "/blogs/blog1.html",
  "title": "blog1",
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
  "filePathRelative": "blogs/blog1.md"
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
