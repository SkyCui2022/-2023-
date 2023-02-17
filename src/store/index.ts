
import { createPinia, defineStore } from 'pinia'
import UserApi from '@ctsy/api-sdk/dist/modules/User'
import URule, { wait } from '../api/lib'
import YUserApi from '@yakj/sdk/dist/User'
import { array_key_set } from '@ctsy/common'
import YOrgApi from '@yakj/sdk/dist/Org'

var Relogin = {
    Time: 0,
}
export const useStore = defineStore('App', {
    state: () => {
        return {
            User: new UserApi.LoginResult,
            Title: '',
            Rule: new URule,
            Enter: { EID: 0, Title: '' },
            Members: [],
            MemberMap: {
                0: { Nick: '', Avatar: '' }
            }
        }
    },
    getters: {
        UID(s) { return s.User.UID },
        Nick(s) { return s.User.Nick },
        Member(s) {
            //@ts-ignore
            return s.Members.filter((o) => o.UID == s.UID).length > 0
        }
    },
    actions: {
        /**
         * 
         * @param EID 
         * @returns 
         */
        async change(EID: number) {
            let r = await wait(YUserApi.change(EID))
            let m = await YOrgApi.members()
            this.$patch({
                Rule: r.Rules,
                Enter: r.Enter,
                Members: m,
                MemberMap: array_key_set(m, 'UID')
            })
            return r;
        },
        /**
         * 校验登陆状态
         * @returns 
         */
        async relogin() {
            if (Date.now() - Relogin.Time < 600000) {
                return;
            }
            let rs = await UserApi.AuthApi.relogin(false, { Auto: false, Regist: false })
            if (rs && rs.UID) {
                this.$patch((s) => {
                    s.User = rs;
                })
                // this.enters()
            }
            Relogin.Time = Date.now()
            return this.User;
        },
    }
})
