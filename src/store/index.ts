import { createPinia, defineStore } from 'pinia'
import URule, { wait } from '../api/lib'
// import YUserApi from '@yakj/sdk/dist/User'
import { array_key_set, delay_cb } from '@ctsy/common'
import { EntityChangeEnterRes, EntityLoginRes, EntityUserInfoMap,DicsApi, UserApi,OrgsApi,EntityOrgs } from '@yakj/sdk/sdk/sdk'
// import YOrgApi from '@yakj/sdk/dist/Org'

var Relogin = {
  Time: 0
}
var UserMapPs: { [key: string]: Function[] } = {}
var UserMapUIDs: number[] = []
export const useStore = defineStore('App', {
  state: () => {
    return {
      UserMap: {},
      OrgMap: {},
      AccMap:{},
      User: new EntityLoginRes(),
      Enter: new EntityChangeEnterRes
    } as {
      OrgMap:{[key:number]:EntityOrgs}
      UserMap: { [key: string]: EntityUserInfoMap },
      AccMap:{[key:number]:string}
      User: EntityLoginRes,
      Enter: EntityChangeEnterRes
    }
  },
  getters: {
    UID(s) {
      return s.User.UID
    },
  },
  actions: {
    /**
     *
     * @param EID
     * @returns
     */
    async change(EID: number) {
      // let r = await wait(YUserApi.change(EID))
      // let m = await YOrgApi.members()
      // this.$patch({
      //     Rule: r.Rules,
      //     Enter: r.Enter,
      //     Members: m,
      //     MemberMap: array_key_set(m, 'UID')
      // })
      // return r;
    },
    //
    async getAccount(UID: number) {
      if (this.$state.UserMap[UID]) {
        return this.$state.UserMap[UID]
      }
      if (!UserMapUIDs.includes(UID))
        UserMapUIDs.push(UID)
      return new Promise(async (s, j) => {
        if (!UserMapPs[UID]) { UserMapPs[UID] = [] }
        UserMapPs[UID].push(s)
        delay_cb('userinfo', 200, () => {
          //等待一定执行时间后批量请求数据
          UserApi.infos(UserMapUIDs).then(u => {
            UserMapUIDs = []
            for (let x of u.L) {
              this.$state.UserMap[x.UID] = x
            }
            for (let uid in UserMapPs) {
              let u = this.$state.UserMap[uid] || new EntityUserInfoMap
              for (let cb of UserMapPs[uid] || []) {
                cb(u)
              }
            }
            UserMapPs = {}
            return u.L
          })
        })
      })
    },
    /**
     * 校验登陆状态
     * @returns
     */
    async relogin(EID: number) {
      if (Date.now() - Relogin.Time < 600000) {
        return
      }
      let rs = await UserApi.relogin(false, EID)
      if (rs.UID > 0) {
        this.User = rs
        if (EID > 0) {
          this.Enter = rs.Enter
          this.OrgMap = array_key_set(rs.Enter.Orgs, 'OrgID')
        }
      }
      Relogin.Time = Date.now()
      return this.User
    },

    async getOrg(EID: number) {
      // let rs: EntityOrgs[] = (await OrgsApi.tree(0, EID)).L
      // rs.forEach(v => {
      //   this.OrgMap[v.OrgID]=v
      // })
    },

    async getAcc() {
      let rs = (await DicsApi.search({ W: { PDID: 446 }, P: 1, N: 999 } as any)).L
      this.AccMap=array_key_set(rs,'DID')
    }
  }
})
