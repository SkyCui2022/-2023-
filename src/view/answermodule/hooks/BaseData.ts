import { MemberApi,EntityTreeMemberRes,EnterApi,EntityMemberRs,EntityGetEnterprisesRes,EntitySearchMemberReq} from '@yakj/sdk/sdk/sdk'
import { ref,reactive } from 'vue'

interface State{
    User: EntityMemberRs,
    Enter: EntityGetEnterprisesRes
    UserMap: {[index:number]:any}
    OrgMap:{[index:number]:EntityTreeMemberRes}
}

export const State = reactive<State>({
    User: new EntityMemberRs(),
    Enter: new EntityGetEnterprisesRes(),
    UserMap: {},
    OrgMap:{}
})

export default function useStore() {
     
    async function getOrg() {
        let rs: EntityTreeMemberRes = (await MemberApi.tree())
        rs.L.forEach((v) => {
            if (v.Type !== 2) {
            //@ts-ignore
               State.OrgMap[v.OrgID]=v
            } else {
            //@ts-ignore
                State.UserMap[v.OrgID]=v
            }
        })
    }

    async function getMember(EID:number) {
        let rs = await MemberApi.search(Object.assign(new EntitySearchMemberReq(),{N:1000,W:{EID}}))
        rs.L.forEach((v) => {
            //@ts-ignore
            State.UserMap[v.UID]=v
        })
    }
    async function getEnter(EID:number) {
        let rs = await EnterApi.getByEID(EID)
        State.Enter=rs
    }

    function getUser(rs:any) {
       State. User=rs
    }
    return {State,getOrg,getMember,getUser,getEnter}
}