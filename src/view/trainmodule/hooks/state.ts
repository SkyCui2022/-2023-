import { reactive } from 'vue'
import { EntityRankLog } from '@yakj/sdk/sdk/sdk'

interface State {
  Active: number
  Logs: any[]
  Rank: EntityRankLog[]
  SearchValue: string
}

export const State: State = reactive({
  Active: 0,
  Logs: [],
  Rank: [],
  SearchValue: ''
})
