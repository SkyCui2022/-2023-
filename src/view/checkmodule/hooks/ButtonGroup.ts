import { ref } from 'vue'
import { Group } from '../api/check'
import {useRouter} from 'vue-router'

export default function useGroup () {
  const ButtonGroups = ref(Group)
  const EID = ref(0)
  const OID = ref(0)
  const router=useRouter()
  function click (s: string) {
    switch (s) {
      case '整改隐患':
        toDangerList()
        break
      case '其他隐患':
        toCreateDanger()
        break
      case '检查统计':
        toCheckLogs()
        break
    }
  }
  function toDangerList () {
    location.href=`https://wechat.tansuyun.cn/y5/risk/#/checkdanger/${EID.value}`
  }
  function toCreateDanger () {
    location.href=`https://wechat.tansuyun.cn/y5/risk/#/checkdanger/create/${EID.value}`
  }
  function toCheckLogs () {
    router.push(`/check/logdetail/${EID.value}/${OID.value}`)
  }
  return { ButtonGroups,EID,OID, click,toDangerList, toCreateDanger ,toCheckLogs}
}
