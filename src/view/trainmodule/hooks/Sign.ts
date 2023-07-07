import { ref } from 'vue'
import { wait } from '../../../api/lib'
import { TrainsApi } from '@yakj/sdk/sdk/sdk'
import { TrainID } from '../../../api/Train'

export default function useSign () {
  const ShowSign = ref(false)

  async function success (URL: string) {
    let rs = await wait(
      TrainsApi.signByTrainID(TrainID, 
         URL,
         Reslut.value.Mine.LastTLID
      )
    )
  }
  function cancel () {
    console.log('取消签字')
  }

  return { ShowSign, success, cancel }
}
