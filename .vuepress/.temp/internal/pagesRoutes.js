import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"Just My Blog :-p"},["/index.html","/README.md"]],
  ["v-8daa1a0e","/",{"title":"主页"},["/index.html","/index.md"]],
  ["v-fb0b00e8","/ideas/",{"title":"Ideas"},["/ideas/index.html","/ideas/README.md"]],
  ["v-003c11ac","/knowledge/",{"title":"知识"},["/knowledge/index.html","/knowledge/README.md"]],
  ["v-76fdf177","/blogs/",{"title":"asdf"},["/blogs/index.html","/blogs/README.md"]],
  ["v-482a23be","/blogs/blog1.html",{"title":"blog1"},["/blogs/blog1","/blogs/blog1.md"]],
  ["v-519da26f","/knowledge/books/",{"title":"书"},["/knowledge/books/index.html","/knowledge/books/README.md"]],
  ["v-2a9a60f4","/knowledge/books/WebAssembly%E5%85%A5%E9%97%A8%E8%AF%BE.html",{"title":"WebAssembly入门课"},["/knowledge/books/WebAssembly入门课.html","/knowledge/books/WebAssembly%E5%85%A5%E9%97%A8%E8%AF%BE","/knowledge/books/WebAssembly入门课.md","/knowledge/books/WebAssembly%E5%85%A5%E9%97%A8%E8%AF%BE.md"]],
  ["v-2455c32d","/knowledge/books/%E3%80%8ACSS%E4%B8%96%E7%95%8C%E3%80%8B.html",{"title":"《CSS世界》"},["/knowledge/books/《CSS世界》.html","/knowledge/books/%E3%80%8ACSS%E4%B8%96%E7%95%8C%E3%80%8B","/knowledge/books/《CSS世界》.md","/knowledge/books/%E3%80%8ACSS%E4%B8%96%E7%95%8C%E3%80%8B.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
