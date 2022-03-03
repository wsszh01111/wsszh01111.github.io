import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"Just My Blog :-p"},["/index.html","/README.md"]],
  ["v-8daa1a0e","/",{"title":"主页"},["/index.html","/index.md"]],
  ["v-76fdf177","/blogs/",{"title":"asdf"},["/blogs/index.html","/blogs/README.md"]],
  ["v-482a23be","/blogs/blog1.html",{"title":"blog1"},["/blogs/blog1","/blogs/blog1.md"]],
  ["v-fb0b00e8","/ideas/",{"title":"Ideas"},["/ideas/index.html","/ideas/README.md"]],
  ["v-003c11ac","/knowledge/",{"title":"knowledge"},["/knowledge/index.html","/knowledge/README.md"]],
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
