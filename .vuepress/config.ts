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
        text: '算法',
        link: '/algorithms/',
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
      ],
      '/algorithms/': [
        {
          text: '算法',
          link: '/algorithms/',
          children: [
            {
              text: 'Leetcode',
              link: '/algorithms/leetcode/',
              children: [
                "/algorithms/leetcode/11.20220302.maxArea.md",
                "/algorithms/leetcode/14.LongestCommonPrefix.md",
                "/algorithms/leetcode/145.20220224.BinaryTreePostorderTraversal.md",
                "/algorithms/leetcode/15.Sum3.md",
                "/algorithms/leetcode/1541.20220310.MinInsertions.md",
                "/algorithms/leetcode/16.20220228.ThreeSumClosest.md",
                "/algorithms/leetcode/17.LetterCombinationsOfAPhoneNumber.md",
                "/algorithms/leetcode/1791.20220218.FindCenterOfStarGraph.md",
                "/algorithms/leetcode/20.20220308.IsValid.md",
                "/algorithms/leetcode/2016.20220226.MaximumDifference.md",
                "/algorithms/leetcode/2100.20220306.GoodDaysToRobBank.md",
                "/algorithms/leetcode/2104.md",
                "/algorithms/leetcode/234.20220218.PalindromeLinkedList.md",
                "/algorithms/leetcode/258.20220303.AddDigits.md",
                "/algorithms/leetcode/292.20220222.NimGame.md",
                "/algorithms/leetcode/3.LengthOfLongestSubString.md",
                "/algorithms/leetcode/300.20220225.LongestIncreasingSubsequence.md",
                "/algorithms/leetcode/34.FindFirstAndLastPositionOfElementInSortedArray.md",
                "/algorithms/leetcode/392.IsSubSequence.md",
                "/algorithms/leetcode/448.FindAllNumbersDisappearedInAnArray.md",
                "/algorithms/leetcode/47.20220223.PermuteUnique.md",
                "/algorithms/leetcode/5.LongestPlalindrome.md",
                "/algorithms/leetcode/504.20220307.ConvertToBase7.md",
                "/algorithms/leetcode/521.20220305.findLUSLength.md",
                "/algorithms/leetcode/6.20220303.ZigzagConversion.md",
                "/algorithms/leetcode/688.20220217.KnightProbabilityInChessboard.md",
                "/algorithms/leetcode/704.BinarySearch.md",
                "/algorithms/leetcode/717.20220220.IsOneBitCharacter.md",
                "/algorithms/leetcode/8.20220227.myAtoi.md",
                "/algorithms/leetcode/838.20220221.PushDominoes.md",
                "/algorithms/leetcode/875.20220220.KokoEatingBananas.md",
                "/algorithms/leetcode/9.PalindromeNumber.md",
                "/algorithms/leetcode/917.20220223.ReverseOnlyLetters.md",
                "/algorithms/leetcode/921.20220309.MinAddToMakeValid.md",
                "/algorithms/leetcode/969.20220219.PancakeSorting.md",
                "/algorithms/leetcode/590.20220312.NAryTreePostorderTraversal.md",
                "/algorithms/leetcode/543.20220313.DiameterOfBinaryTree.md",
                "/algorithms/leetcode/102.20220313.LevelOrder.md",
                "/algorithms/leetcode/599.20220314.FindRestaurant.md",
                "/algorithms/leetcode/78.20220315.Subsets.md",
                "/algorithms/leetcode/77.20220316.Combinations.md",
                "/algorithms/leetcode/90.20220316.SubsetsWithDup.md",
                "/algorithms/leetcode/40.20220317.CombinationSum2.md",
                "/algorithms/leetcode/606.20220319.Tree2str.md",
                '/algorithms/leetcode/39.20220320.CombinationSum.md',
                '/algorithms/leetcode/146.20220322.LRUCache.md',
                '/algorithms/leetcode/2028.20220327.MissingRolls.md',
                '/algorithms/leetcode/693.20220328.HasAlternatingBits.md',
              ]
            }
          ]
        }
      ]
    }
  }
})