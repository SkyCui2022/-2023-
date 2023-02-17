import { createRouter, createWebHashHistory } from 'vue-router'
import Wechat from '@ctsy/api-sdk/dist/modules/Wechat'
import { useStore } from '../store'
import { showQr } from '../api/lib'
import User from '@ctsy/api-sdk/dist/modules/User'
import { store as s } from '@ctsy/api-sdk/dist/lib'
import { WechatID } from '../config'
import Created from '../view/Created.vue'
import CheckDetail from '../view/CheckDetail.vue'
const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  // history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/checkanswerd/created'
    },
    {
      path: '/checkanswerd/created',
      name: '添加安全检查表',
      component: Created
    },
    {
      path: '/check/detail/:CheckID/:CLID',
      name: '检查详情',
      component: CheckDetail
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
