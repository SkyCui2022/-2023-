import { ref, Ref } from 'vue'
import { TrainLogApi, EntityRankLog } from '@yakj/sdk/sdk/sdk'
import { wait } from '../../../api/lib'
import { TrainID } from '../../../api/Train'
import get_yan_store from '../../../store/yan'
import { State } from './state'

export default function useActive () {
  const yStore = get_yan_store()
  async function change_active (n: number) {
    State.Active = n
    State.SearchValue = ''
    switch (n) {
      case 2:
        let logs = await wait(
          TrainLogApi.logByTrainIDPNUID(1, 10, yStore.User.UID, '', '', TrainID)
        )
        State.Logs = logs.L
        logs.L.forEach((v: any) => yStore.getUserInfo(v.CUID))

        break
      case 3:
        let rank = await wait(
          TrainLogApi.rankByTrainIDPN('MaxScore DESC', 1, 10, TrainID)
        )
        State.Rank = rank.L
        rank.L.forEach((v: any) => yStore.getUserInfo(v.CUID))
        break
    }
  }
  return { change_active }
}
