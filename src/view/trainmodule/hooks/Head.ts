import { ref, computed } from 'vue'
import { Toast } from 'vant'
import { TrainLogApi, EntityGetTrainsRes } from '@yakj/sdk/sdk/sdk'
import { store } from '@ctsy/common'
import { wait } from '../../../api/lib'
import get_yan_store from '../../../store/yan'
import { TrainID } from '../../../api/Train'
import { State } from './state'

export default function useHead () {
  const yStore = get_yan_store()
  const Reslut = ref(new EntityGetTrainsRes())
  const ShowTab = ref(true)
  const Time = ref(0)

  const LearnTime = computed(() => {
    let s: number | string = 0,
      m: number | string = 0,
      h: number | string = 0
    s = Time.value % 60
    if (Math.floor(Time.value / 60) <= 60) {
      m = Math.floor(Time.value / 60)
    } else {
      let min = Math.floor(Time.value / 60)
      h = Math.floor(min / 60)
      m = min % 60
    }
    s = s < 10 ? `0${s}` : `${s}`
    m = m < 10 ? `0${m}` : `${m}`
    h = h < 10 ? `0${h}` : `${h}`
    return Time.value > 3600 ? `${h}:${m}:${s}` : `${m}:${s}`
  })

  async function to_more (n: number) {
    Toast.loading('正在加载个人数据')
    store.set('active', State.Active)
    ShowTab.value = !ShowTab.value
    State.Active = 4
    let logs = await wait(
      TrainLogApi.logByTrainIDPNUID(1, 10, yStore.User.UID, '', '', TrainID)
    )

    State.Logs = logs.L
    logs.L.forEach((v: any) => yStore.getUserInfo(v.CUID))
    console.log(State, n)
  }

  return { yStore, Reslut, ShowTab, Time, LearnTime, to_more }
}
