import { createRouter, createWebHashHistory } from 'vue-router'
import AppRouter from './appRouter'
import CheckCreated from '../view/checkmodule/Created.vue'
import CheckList from '../view/checkmodule/CheckList.vue'
import CheckDetail from '../view/checkmodule/CheckDetail.vue'
import CheckLogs from '../view/checkmodule/CheckLogs.vue'
import CheckLogDetail from '../view/checkmodule/CheckLogDetail.vue'
import TrainDetail from '../view/trainmodule/Train.vue'
import TrainList from '../view/trainmodule/TrainList.vue'
import Train from '../view/trainmodule/Index.vue'
import TrainLog from '../view/trainmodule/TrainLog.vue'
import AnswerPaper from '../view/answermodule/Paper.vue'
import AnswerDetail from '../view/answermodule/AnswerdDetail.vue'
import RiskList from '../view/riskmodule/Index.vue'
import RiskPage from '../view/riskmodule/Page.vue'
import RiskDangerDetail from '../view/riskmodule/Detail.vue'
import HiddenTrouble from '../view/checkmodule/Index.vue'
import TroubleDetail from '../view/checkmodule/Detail.vue'
import CreateTrouble from '../view/checkdangermodule/Create.vue'
import Enter from '../view/entermodule/Index.vue'
import Law from '../view/lawmodule/Index.vue'
import Org from '../view/orgmodule/Org.vue'
import OrgDetail from '../view/orgmodule/OrgDetail.vue'
import UnitDetail from '../view/orgmodule/UnitDetail.vue'
import PostDetail from '../view/orgmodule/PostDetail.vue'
import Member from '../view/orgmodule/Member.vue'
import SafetyActivity from '../view/safety-activity-module/Index.vue'
import ActiveCreate from '../view/safety-activity-module/Create.vue'
import ActiveDetail from '../view/safety-activity-module/Detail.vue'
import ActiveLog from '../view/safety-activity-module/Log.vue'
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
          path: AppRouter.Check.kDetail,
          name: '检查详情',
          component: CheckDetail
        },
        {
          path: AppRouter.Check.List,
          name: '检查表清单',
          component: CheckList
        },{
          path: AppRouter.Check.Log,
          name: '检查记录',
          component: CheckLogs
        },{
          path: AppRouter.Check.LogDetail,
          name: '检查记录详情',
          component: CheckLogDetail
        }
      ]
    },
    {
      path: '/Train',
      name: '培训',
      children: [
        {
          path: AppRouter.Train.Home,
          name: '培训库',
          component: Train
        }, {
          path: AppRouter.Train.List,
          name: '培训列表',
          component: TrainList
        }, {
          path: AppRouter.Train.Log,
          name: '培训记录',
          component: TrainLog
        }, {
          path: AppRouter.Train.Detail,
          name: '培训详情',
          component: TrainDetail
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
    },
    {
      path: 'Enter',
      name: '企业',
      children: [
        {
          path: AppRouter.Enter.EnterBase,
          name: '企业信息',
          component:Enter
        }
      ]
    },
    {
      path: 'Law',
      name: '法律法规',
      children: [
        {
          path: AppRouter.Law.List,
          name: '法律法规库',
          component:Law
        }
      ]
    },
    {
      path: 'Org',
      name: '组织架构',
      children: [
        {
          path: AppRouter.Org.List,
          name: '组织架构',
          component:Org
        },{
          path: AppRouter.Org.OrgDetail,
          name: '组织架构详情',
          component:OrgDetail
        },{
          path: AppRouter.Org.UnitDetail,
          name: '部门详情',
          component:UnitDetail
        },{
          path: AppRouter.Org.PostDetail,
          name: '岗位详情',
          component:PostDetail
        },{
          path: AppRouter.Org.Member,
          name: '员工档案',
          component:Member
        }
      ]
    },
    {
      path: 'Active',
      name: '安全活动',
      children: [
        {
          path: AppRouter.Active.Index,
          name: '安全活动',
          conponent:SafetyActivity
        },
        {
          path: AppRouter.Active.Create,
          name: '创建活动',
          conponent:ActiveCreate
        },
        {
          path: AppRouter.Active.Detail,
          name: '活动详情',
          conponent:ActiveDetail
        },
        {
          path: AppRouter.Active.Log,
          name: '活动记录',
          conponent:ActiveLog
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
