import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"Just My Blog :-p"},["/index.html","/README.md"]],
  ["v-8daa1a0e","/",{"title":"主页"},["/index.html","/index.md"]],
  ["v-fb0b00e8","/ideas/",{"title":"Ideas"},["/ideas/index.html","/ideas/README.md"]],
  ["v-76fdf177","/blogs/",{"title":"asdf"},["/blogs/index.html","/blogs/README.md"]],
  ["v-482a23be","/blogs/blog1.html",{"title":"blog1"},["/blogs/blog1","/blogs/blog1.md"]],
  ["v-003c11ac","/knowledge/",{"title":"知识"},["/knowledge/index.html","/knowledge/README.md"]],
  ["v-519da26f","/knowledge/books/",{"title":"书"},["/knowledge/books/index.html","/knowledge/books/README.md"]],
  ["v-2a9a60f4","/knowledge/books/WebAssembly%E5%85%A5%E9%97%A8%E8%AF%BE.html",{"title":"WebAssembly入门课"},["/knowledge/books/WebAssembly入门课.html","/knowledge/books/WebAssembly%E5%85%A5%E9%97%A8%E8%AF%BE","/knowledge/books/WebAssembly入门课.md","/knowledge/books/WebAssembly%E5%85%A5%E9%97%A8%E8%AF%BE.md"]],
  ["v-2455c32d","/knowledge/books/%E3%80%8ACSS%E4%B8%96%E7%95%8C%E3%80%8B.html",{"title":"《CSS世界》"},["/knowledge/books/《CSS世界》.html","/knowledge/books/%E3%80%8ACSS%E4%B8%96%E7%95%8C%E3%80%8B","/knowledge/books/《CSS世界》.md","/knowledge/books/%E3%80%8ACSS%E4%B8%96%E7%95%8C%E3%80%8B.md"]],
  ["v-51ef772b","/knowledge/build/",{"title":"构建工具相关"},["/knowledge/build/index.html","/knowledge/build/README.md"]],
  ["v-23c95c57","/knowledge/build/Webpack.html",{"title":"webpack"},["/knowledge/build/Webpack","/knowledge/build/Webpack.md"]],
  ["v-7ae5de94","/knowledge/css/",{"title":"CSS"},["/knowledge/css/index.html","/knowledge/css/README.md"]],
  ["v-db38378c","/knowledge/css/Replaced%20element.html",{"title":"Replaced element"},["/knowledge/css/Replaced element.html","/knowledge/css/Replaced%20element","/knowledge/css/Replaced element.md","/knowledge/css/Replaced%20element.md"]],
  ["v-762b010d","/knowledge/css/display.html",{"title":"display"},["/knowledge/css/display","/knowledge/css/display.md"]],
  ["v-e7c88122","/knowledge/css/writing-mode.html",{"title":"writing-mode"},["/knowledge/css/writing-mode","/knowledge/css/writing-mode.md"]],
  ["v-c273fefc","/knowledge/js/Currying.html",{"title":"Currying"},["/knowledge/js/Currying","/knowledge/js/Currying.md"]],
  ["v-2412a7cd","/knowledge/js/Encoding%20function.html",{"title":"Encoding function"},["/knowledge/js/Encoding function.html","/knowledge/js/Encoding%20function","/knowledge/js/Encoding function.md","/knowledge/js/Encoding%20function.md"]],
  ["v-58db5c9c","/knowledge/js/",{"title":"JS"},["/knowledge/js/index.html","/knowledge/js/README.md"]],
  ["v-21a74958","/knowledge/js/RegExp.html",{"title":"RegExp"},["/knowledge/js/RegExp","/knowledge/js/RegExp.md"]],
  ["v-6689b5a0","/knowledge/js/Trailing%20commas.html",{"title":"Trailing commas"},["/knowledge/js/Trailing commas.html","/knowledge/js/Trailing%20commas","/knowledge/js/Trailing commas.md","/knowledge/js/Trailing%20commas.md"]],
  ["v-74c64da0","/knowledge/js/bind.html",{"title":"bind"},["/knowledge/js/bind","/knowledge/js/bind.md"]],
  ["v-1ab00bfd","/knowledge/js/class.html",{"title":"class"},["/knowledge/js/class","/knowledge/js/class.md"]],
  ["v-5e04a7d1","/knowledge/js/module.html",{"title":"module"},["/knowledge/js/module","/knowledge/js/module.md"]],
  ["v-6ae76301","/knowledge/js/parseInt.html",{"title":"parseInt"},["/knowledge/js/parseInt","/knowledge/js/parseInt.md"]],
  ["v-7557aca1","/knowledge/js/toFixed%20and%20toExponential.html",{"title":"toFixed and toExponential"},["/knowledge/js/toFixed and toExponential.html","/knowledge/js/toFixed%20and%20toExponential","/knowledge/js/toFixed and toExponential.md","/knowledge/js/toFixed%20and%20toExponential.md"]],
  ["v-6683b3ce","/knowledge/network/HTTPS.html",{"title":"HTTPS"},["/knowledge/network/HTTPS","/knowledge/network/HTTPS.md"]],
  ["v-377f18eb","/knowledge/network/",{"title":"网络相关"},["/knowledge/network/index.html","/knowledge/network/README.md"]],
  ["v-c3707cbc","/knowledge/node/API.html",{"title":"API"},["/knowledge/node/API","/knowledge/node/API.md"]],
  ["v-e0a3f4fa","/knowledge/node/",{"title":"node"},["/knowledge/node/index.html","/knowledge/node/README.md"]],
  ["v-0177d7d8","/knowledge/node/Shebang.html",{"title":"Shebang"},["/knowledge/node/Shebang","/knowledge/node/Shebang.md"]],
  ["v-44ccddec","/knowledge/node/npm%20scripts.html",{"title":"npm scripts"},["/knowledge/node/npm scripts.html","/knowledge/node/npm%20scripts","/knowledge/node/npm scripts.md","/knowledge/node/npm%20scripts.md"]],
  ["v-64505bb4","/knowledge/node/npx.html",{"title":"npx"},["/knowledge/node/npx","/knowledge/node/npx.md"]],
  ["v-9a51a0d2","/knowledge/node/require.html",{"title":"require"},["/knowledge/node/require","/knowledge/node/require.md"]],
  ["v-08ee10a2","/knowledge/others/Big%20O.html",{"title":"Big O"},["/knowledge/others/Big O.html","/knowledge/others/Big%20O","/knowledge/others/Big O.md","/knowledge/others/Big%20O.md"]],
  ["v-5df678cb","/knowledge/others/Browser%20pre-execute.html",{"title":"Browser pre-execute"},["/knowledge/others/Browser pre-execute.html","/knowledge/others/Browser%20pre-execute","/knowledge/others/Browser pre-execute.md","/knowledge/others/Browser%20pre-execute.md"]],
  ["v-4a6e66e2","/knowledge/others/Electron%20Model.html",{"title":"Electron Model"},["/knowledge/others/Electron Model.html","/knowledge/others/Electron%20Model","/knowledge/others/Electron Model.md","/knowledge/others/Electron%20Model.md"]],
  ["v-49110c7b","/knowledge/others/GUN.html",{"title":"GUN"},["/knowledge/others/GUN","/knowledge/others/GUN.md"]],
  ["v-62f8bd82","/knowledge/others/Monorepo.html",{"title":"Monorepo"},["/knowledge/others/Monorepo","/knowledge/others/Monorepo.md"]],
  ["v-067203ad","/knowledge/others/Process%20and%20thread.html",{"title":"Process and thread"},["/knowledge/others/Process and thread.html","/knowledge/others/Process%20and%20thread","/knowledge/others/Process and thread.md","/knowledge/others/Process%20and%20thread.md"]],
  ["v-4e0723bc","/knowledge/others/Programming%20paradigm.html",{"title":"Programming paradigm"},["/knowledge/others/Programming paradigm.html","/knowledge/others/Programming%20paradigm","/knowledge/others/Programming paradigm.md","/knowledge/others/Programming%20paradigm.md"]],
  ["v-cc2ae27c","/knowledge/others/",{"title":"其他重要的"},["/knowledge/others/index.html","/knowledge/others/README.md"]],
  ["v-4daa02d3","/knowledge/others/Rust.html",{"title":"Rust"},["/knowledge/others/Rust","/knowledge/others/Rust.md"]],
  ["v-7898cab8","/knowledge/others/System%20Environment.html",{"title":"System Environment"},["/knowledge/others/System Environment.html","/knowledge/others/System%20Environment","/knowledge/others/System Environment.md","/knowledge/others/System%20Environment.md"]],
  ["v-11858802","/knowledge/others/Tips.html",{"title":"Tips"},["/knowledge/others/Tips","/knowledge/others/Tips.md"]],
  ["v-7ad48cda","/knowledge/vue/",{"title":"Vue"},["/knowledge/vue/index.html","/knowledge/vue/README.md"]],
  ["v-75ca2029","/knowledge/vue/vue2/Reactive%20in%20vue2.html",{"title":"Reactive in vue2"},["/knowledge/vue/vue2/Reactive in vue2.html","/knowledge/vue/vue2/Reactive%20in%20vue2","/knowledge/vue/vue2/Reactive in vue2.md","/knowledge/vue/vue2/Reactive%20in%20vue2.md"]],
  ["v-b9b3d632","/knowledge/vue/vue3/Composition%20API.html",{"title":"Composition API"},["/knowledge/vue/vue3/Composition API.html","/knowledge/vue/vue3/Composition%20API","/knowledge/vue/vue3/Composition API.md","/knowledge/vue/vue3/Composition%20API.md"]],
  ["v-44a3d0af","/knowledge/vue/vue3/",{"title":"Vue3"},["/knowledge/vue/vue3/index.html","/knowledge/vue/vue3/README.md"]],
  ["v-9e5fecee","/knowledge/vue/vue3/Reactive%20in%20vue3.html",{"title":"Reactive in vue3"},["/knowledge/vue/vue3/Reactive in vue3.html","/knowledge/vue/vue3/Reactive%20in%20vue3","/knowledge/vue/vue3/Reactive in vue3.md","/knowledge/vue/vue3/Reactive%20in%20vue3.md"]],
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
