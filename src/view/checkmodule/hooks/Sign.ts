import { ref } from 'vue'
// import { useRouter } from 'vue-router'   需要在setup()下使用
import useRouter from '../router' //这里的useRouter紧紧是变量名，可以不使用useRouter
import { wait } from '../api/lib'
import { timeout } from '@ctsy/common'
import { CheckApi, EntitySubmitCheckReq ,EntitySubmitCheckLog,EntitySingleCheckDetailItem} from '@yakj/sdk/sdk/sdk'

//SubmitCheck参数为useRadio的状态
export default function useSign (SubmitCheck: EntitySubmitCheckReq,OtherDanger:EntitySubmitCheckLog|EntitySingleCheckDetailItem) {
  const router = useRouter
  const ShowSign = ref(false)
  async function success (URL: string) {
    SubmitCheck.Sign = URL
    //@ts-ignore
    SubmitCheck.Items.push(OtherDanger)
    let rs = await wait(CheckApi.submit(SubmitCheck))
    timeout(200)
    ShowSign.value=false
    router.push(`/check/detail/${router.currentRoute.value.params.EID}/${SubmitCheck.CheckID}/${router.currentRoute.value.query.Signed? router.currentRoute.value.params.CLID:rs.CLID}${router.currentRoute.value.query.OType&&router.currentRoute.value.query.OID?`?Signed=true&OType=${router.currentRoute.value.query.OType}&OID=${router.currentRoute.value.query.OID}`:'?Signed=true'}`)
  }

  return { ShowSign, success }
}
