import { createRouter, createWebHashHistory } from 'vue-router'
import AppRouter from './appRouter'
import CheckCreated from '../view/checkmodule/Created.vue'
import CheckDetail from '../view/checkmodule/CheckDetail.vue'
import JoinTrain from '../view/trainmodule/Train.vue'
import AnswerPaper from '../view/answermodule/Paper.vue'
import AnswerDetail from '../view/answermodule/AnswerdDetail.vue'
import RiskList from '../view/riskmodule/List.vue'
import RiskPage from '../view/riskmodule/Page.vue'
import RiskDangerDetail from '../view/riskmodule/DangerDetail.vue'
import HiddenTrouble from '../view/troublemodule/HiddenTrouble.vue'
import TroubleDetail from '../view/troublemodule/TroubleDetail.vue'
import Text from '../view/text.vue'

const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  // history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/Check'
    },
    {
      path: '/text',
      name: '测试',
      component:Text
    },
    {
      path: '/Check',
      name: '检查表',
      redirect: AppRouter.Check.Create,
      children: [
        {
          path: AppRouter.Check.Create,
          name: '添加安全检查表',
          component: CheckCreated
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
    },
    {
      path: '/Risk',
      name: '风险点',
      children: [
        {
          path: AppRouter.Risk.List,
          name: '列表',
          component: RiskList
        },
        {
          path: AppRouter.Risk.Page,
          name: '衔接页面',
          component: RiskPage
        },
        {
          path: AppRouter.Risk.Detail,
          name: '详情',
          component: RiskDangerDetail
        }
      ]
    },
    {
      path: '/Risk',
      name: '隐患',
      children: [
        {
          path: AppRouter.Trouble.HiddenTrouble,
          name: '隐患台账',
          component: HiddenTrouble
        },
        {
          path: AppRouter.Trouble.Detail,
          name: '隐患详情',
          component: TroubleDetail
        },
       
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
