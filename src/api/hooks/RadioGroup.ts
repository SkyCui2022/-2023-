import { ref, provide } from 'vue'
import { EntitySubmitCheckReq } from '../api/check'
import { URL } from '../api/check'

export default function useRadio () {
  const AllRight = ref('')
  const SignTextColor = ref('#b3bdcc')
  const SubmitCheck = ref(new EntitySubmitCheckReq())

  let SignLogo = `${URL}2023-02-01/signlogo.svg`

  //全选
  function all_right () {
    SubmitCheck.value.Items.map(v => {
      return (v.Result = 0)
    })
    SignTextColor.value = '#1B6FFE'
    SignLogo = `${URL}2023-02-01/signlogoactived.svg`
  }
  // 选项单选
  function radio (obj: any, num: number) {
    SubmitCheck.value.Items[obj].Result = num
    if (SubmitCheck.value.Items.some(v => v.Result == 1)) {
      AllRight.value = ''
      SignTextColor.value = '#b3bdcc'
      SignLogo = `${URL}2023-02-01/signlogo.svg`
    }
    if (SubmitCheck.value.Items.every(v => v.Result == 0)) {
      AllRight.value = '0'
    }
    if (SubmitCheck.value.Items.every(v => v.Result !== 999)) {
      SignTextColor.value = '#1B6FFE'
      SignLogo = `${URL}2023-02-01/signlogoactived.svg`
    }
  }

  return { AllRight, SignTextColor, SubmitCheck, all_right, radio }
}
