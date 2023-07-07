import { ref } from 'vue'
// import { useRouter } from 'vue-router'   需要在setup()下使用
import useRouter from '../router' //这里的useRouter紧紧是变量名，可以不使用useRouter
import { wait } from '../api/lib'
import { CheckApi, EntitySubmitCheckReq } from '@yakj/sdk/sdk/sdk'
import { cStatus } from '../store/cui'


//SubmitCheck参数为useRadio的状态
export default function useSign (SubmitCheck: EntitySubmitCheckReq) {
  const router = useRouter
  const ShowSign = ref(false)

  async function success (URL: string) {
    SubmitCheck.Sign = URL
    let rs = await wait(CheckApi.submit(SubmitCheck.CheckID,SubmitCheck.Sign,SubmitCheck.Items,SubmitCheck.Signs))
    router.push(`/check/detail/${cStatus.EID}/${cStatus.CheckID}/${rs.CLID}`)
  }

  return { ShowSign, success }
}
