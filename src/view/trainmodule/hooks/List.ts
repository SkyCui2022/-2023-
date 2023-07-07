import { ref } from 'vue'
import { wait } from '../api/lib'
import { EntityDicsSearchReq ,EntityDicsSearchRes} from '@yakj/sdk/sdk/sdk'

export default function useList(search:Function) {
    const List = ref<{[index:string]:any}[]>([])
    const Loadding = ref(false)
    const ListTotal = ref(0)
    const Where = ref(new EntityDicsSearchReq())
    const Finished=ref(false)
    
    async function onLoad() {
        let rs:EntityDicsSearchRes = await wait(search())
        List.value = rs.L
        ListTotal.value=rs.T
        Loadding.value = false
        List.value.length==ListTotal.value?Finished.value=true:true
    }

    return {List,Loadding,ListTotal,Where,Finished,onLoad}
}