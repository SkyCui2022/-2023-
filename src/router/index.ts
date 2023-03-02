import { createRouter, createWebHashHistory } from 'vue-router'
import Wechat from '@ctsy/api-sdk/dist/modules/Wechat'
import { useStore } from '../store'
import { showQr } from '../api/lib'
import User from '@ctsy/api-sdk/dist/modules/User'
import { store as s } from '@ctsy/api-sdk/dist/lib'
import { WechatID } from '../config'
import AppRouter from './appRouter'
import Created from '../view/checkmodule/Created.vue'
import CheckDetail from '../view/checkmodule/CheckDetail.vue'
import JoinTrain from '../view/trainmodule/Train.vue'
import AnswerPaper from '../view/answermodule/Paper.vue'
import AnswerDetail from '../view/answermodule/AnswerdDetail.vue'

const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  // history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: AppRouter.Check.Create
    },
    {
      path: '/Check',
      name: '检查表',
      children: [
        {
          path: AppRouter.Check.Create,
          name: '添加安全检查表',
          component: Created
        },
        {
          path: AppRouter.Check.CheckDetail,
          name: '检查详情',
          component: CheckDetail
        }
      ]
    },
    {
      path: '/Train',
      name: '培训',
      children: [
        {
          path: AppRouter.Train.Join,
          name: '参加培训',
          component: JoinTrain
        }
      ]
    },
    {
      path: '/Answer',
      name: '答题',
      children: [
        {
          path: AppRouter.Answer.Paper,
          name: '试卷',
          component: AnswerPaper
        },
        {
          path: AppRouter.Answer.AnswerDetail,
          name: '答题详情',
          component: AnswerDetail
        }
      ]
    }
  ]
})
// router.afterEach((to, from) => {
//     useStore().$patch((s) => {
//         if ('string' == typeof to.name)
//             s.Title = to.name
//     })
// })
// let first = true
// if (Wechat.IsWechatBrower) {
//     // Wechat.config({WechatID:""})
//     Wechat.jsConfig()
//     setTimeout(() => {
//         try {
//             Wechat.hideMenuItems()
//         } catch (error) {

//         }
//     }, 300)
// }
// router.beforeEach(async (to, from, next) => {
//     let store = useStore()
//     if (store.UID > 0) {

//     } else {
//         await store.relogin()
//     }
//     let p = to.params;
//     if (store.UID <= 0) {
//         s.set('authurl', location.href)
//         location.href = "https://wechat.tansuyun.cn/ytools/auth/"
//         return;
//     }
//     if (first) {

//     }
//     next()
// })
export default router
